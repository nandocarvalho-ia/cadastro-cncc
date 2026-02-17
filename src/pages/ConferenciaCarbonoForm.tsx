import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form-conferencia/QuestionContainer";
import TextQuestion from "@/components/form-conferencia/TextQuestion";
import TextareaQuestion from "@/components/form-conferencia/TextareaQuestion";
import OptionsQuestion from "@/components/form-conferencia/OptionsQuestion";
import SelectQuestion from "@/components/form-conferencia/SelectQuestion";
import {
  conferenceSchema,
  ConferenceFormData,
  QUESTIONS,
} from "@/lib/schemas/conferenciaCarbonoSchema";

const ConferenciaCarbonoForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<ConferenceFormData>({
    resolver: zodResolver(conferenceSchema),
    mode: "onTouched",
  });

  const question = QUESTIONS[currentStep];
  const isLastStep = currentStep === QUESTIONS.length - 1;
  const isAutoAdvance = question.type === "options" || question.type === "select";

  const goToNextStep = async () => {
    const valid = await trigger(question.id);
    if (valid && !isLastStep) {
      setCurrentStep((s) => s + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleOptionSelect = async (id: keyof ConferenceFormData, value: string) => {
    setValue(id, value, { shouldValidate: true });
    setTimeout(async () => {
      const valid = await trigger(id);
      if (valid && !isLastStep) {
        setCurrentStep((s) => s + 1);
      }
    }, 300);
  };

  const onSubmit = async (data: ConferenceFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    localStorage.setItem("conferencia-carbono-last-submission", JSON.stringify(data));
    navigate("/conferencia-carbono/sucesso");
  };

  const fieldError = errors[question.id]?.message as string | undefined;

  const renderQuestion = () => {
    switch (question.type) {
      case "email":
      case "text":
      case "phone":
        return (
          <TextQuestion
            id={question.id}
            question={question.question}
            type={question.type}
            placeholder={question.placeholder}
            error={fieldError}
            register={register}
          />
        );
      case "textarea":
        return (
          <TextareaQuestion
            id={question.id}
            question={question.question}
            placeholder={question.placeholder}
            error={fieldError}
            register={register}
            watch={watch}
          />
        );
      case "options":
        return (
          <OptionsQuestion
            id={question.id}
            question={question.question}
            options={question.options!}
            currentValue={watch(question.id)}
            error={fieldError}
            onSelect={handleOptionSelect}
          />
        );
      case "select":
        return (
          <SelectQuestion
            id={question.id}
            question={question.question}
            options={question.options!}
            currentValue={watch(question.id)}
            error={fieldError}
            onSelect={handleOptionSelect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <QuestionContainer currentStep={currentStep} totalSteps={QUESTIONS.length}>
        <div key={currentStep}>
          {renderQuestion()}
        </div>

        <div className="flex items-center justify-between mt-6">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>

          {isLastStep ? (
            <Button type="submit" disabled={isSubmitting} className="gap-1">
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Finalizar"
              )}
            </Button>
          ) : !isAutoAdvance ? (
            <Button type="button" onClick={goToNextStep} className="gap-1">
              Próximo <ArrowRight className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </QuestionContainer>
    </form>
  );
};

export default ConferenciaCarbonoForm;
