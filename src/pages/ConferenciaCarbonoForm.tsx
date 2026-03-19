import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { getVariantFromPath, getSuccessPath } from "@/lib/getVariantFromPath";
import { ArrowLeft, ArrowRight, Loader2, AlertTriangle, Info } from "lucide-react";
import QuestionContainer from "@/components/form-conferencia/QuestionContainer";
import TextQuestion from "@/components/form-conferencia/TextQuestion";
import TextareaQuestion from "@/components/form-conferencia/TextareaQuestion";
import OptionsQuestion from "@/components/form-conferencia/OptionsQuestion";
import SelectQuestion from "@/components/form-conferencia/SelectQuestion";
import IdentificationScreen from "@/components/form-conferencia/IdentificationScreen";
import {
  conferenceSchema,
  ConferenceFormData,
  QUESTIONS,
} from "@/lib/schemas/conferenciaCarbonoSchema";
import { useOnboardingResolution } from "@/hooks/useOnboardingResolution";
import { supabase } from "@/integrations/supabase/client";

const ConferenciaCarbonoForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resolutionMessage, setResolutionMessage] = useState<{ type: "info" | "warn" | "error"; text: string } | null>(null);
  const [identified, setIdentified] = useState(false);
  const [eventoEmail, setEventoEmail] = useState("");
  const [eventoTelefone, setEventoTelefone] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const variant = getVariantFromPath(location.pathname);

  const resolution = useOnboardingResolution();

  // In evento flow, user starts unidentified; in ref/direct flow, skip identification
  const needsIdentification = resolution.isEventoFlow && !identified;

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<ConferenceFormData>({
    resolver: zodResolver(conferenceSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  // Filter questions: in evento flow, skip email and telefone (already collected)
  const activeQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      if (q.id === "email" && resolution.isEventoFlow) return false;
      if (q.conditional && q.id === "telefone") {
        if (resolution.isEventoFlow) return false;
        return resolution.needsPhone;
      }
      return !q.conditional;
    });
  }, [resolution.needsPhone, resolution.isEventoFlow]);

  const safeStep = Math.min(currentStep, Math.max(0, activeQuestions.length - 1));
  const question = activeQuestions[safeStep];
  const isLastStep = safeStep === activeQuestions.length - 1;
  const isAutoAdvance = question?.type === "options" || question?.type === "select";

  const handleIdentification = async (email: string, telefone: string) => {
    const rotaEvento = resolution.eventoParam || location.pathname.replace(/^\//, "") || variant || "";
    const result = await resolution.resolveByEvento(email, telefone, rotaEvento);
    if (result && result.status === "resolved") {
      setEventoEmail(email);
      setEventoTelefone(telefone);
      // Pre-fill email in form so schema validation passes
      setValue("email", email, { shouldValidate: false });
      setIdentified(true);
      setCurrentStep(0);
    }
  };

  const handlePostEmailResolution = async () => {
    const email = watch("email");
    if (!email) return;

    setResolutionMessage(null);
    const result = await resolution.resolveByEmail(email);

    if (!result) return;

    if (result.status === "not_found") {
      setResolutionMessage({
        type: "warn",
        text: "Não localizamos sua compra com esse e-mail. Verifique se digitou corretamente ou solicite um novo link de acesso.",
      });
    } else if (result.status === "ambiguous") {
      setResolutionMessage({
        type: "info",
        text: "Encontramos mais de um cadastro com esse e-mail. Confirme seu telefone na próxima etapa.",
      });
    }
  };

  const handlePostPhoneResolution = async () => {
    const email = watch("email");
    const telefone = watch("telefone");
    if (!email || !telefone) return;

    setResolutionMessage(null);
    const result = await resolution.resolveByPhone(email, telefone);

    if (!result) return;

    if (result.status === "unresolved") {
      setResolutionMessage({
        type: "warn",
        text: "Não conseguimos vincular automaticamente. Suas respostas serão enviadas para análise manual.",
      });
    }
  };

  const goToNextStep = async () => {
    const valid = await trigger(question.id);
    if (!valid) return;

    if (question.id === "email") {
      await handlePostEmailResolution();
    } else if (question.id === "telefone") {
      await handlePostPhoneResolution();
    }

    if (!isLastStep) {
      setCurrentStep((s) => s + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setResolutionMessage(null);
      setCurrentStep((s) => s - 1);
    }
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
    try {
      const { telefone, ...respostas } = data;

      const submissionEmail = resolution.isEventoFlow ? eventoEmail : data.email;
      const submissionTelefone = resolution.isEventoFlow ? eventoTelefone : (telefone || null);

      const { data: result, error } = await supabase.functions.invoke("submit-onboarding", {
        body: {
          ref: resolution.refToken,
          email: submissionEmail,
          telefone: submissionTelefone,
          respostas,
          rota_evento: resolution.isEventoFlow ? (resolution.eventoParam || location.pathname.replace(/^\//, "")) : undefined,
        },
      });

      if (error) throw error;

      navigate(getSuccessPath(variant), {
        state: { submissionStatus: result.status },
      });
    } catch (err) {
      console.error("Erro ao enviar:", err);
      setResolutionMessage({
        type: "error",
        text: "Ocorreu um erro ao enviar suas respostas. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show identification screen for evento flow
  if (needsIdentification) {
    return (
      <IdentificationScreen
        variant={variant}
        isResolving={resolution.status === "resolving"}
        onSubmit={handleIdentification}
      />
    );
  }

  const fieldError = question ? (errors[question.id]?.message as string | undefined) : undefined;

  const renderQuestion = () => {
    if (!question) return null;
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
      <QuestionContainer currentStep={safeStep} totalSteps={activeQuestions.length} variant={variant}>
        <div key={safeStep}>
          {renderQuestion()}
        </div>

        {resolutionMessage && (
          <div
            className={`flex items-start gap-2 mt-3 p-3 rounded-lg text-sm ${
              resolutionMessage.type === "warn"
                ? "bg-amber-50 text-amber-800 border border-amber-200"
                : resolutionMessage.type === "error"
                ? "bg-red-50 text-red-800 border border-red-200"
                : "bg-blue-50 text-blue-800 border border-blue-200"
            }`}
          >
            {resolutionMessage.type === "warn" || resolutionMessage.type === "error" ? (
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            ) : (
              <Info className="h-4 w-4 mt-0.5 shrink-0" />
            )}
            <span>{resolutionMessage.text}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={safeStep === 0}
            className="flex items-center gap-1 h-[44px] px-3 rounded-[10px] text-carbon-text-500 font-medium transition-colors hover:bg-carbon-slate-100 active:bg-carbon-slate-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </button>

          {isLastStep ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 h-[44px] px-4 rounded-xl bg-carbon-900 text-white font-bold transition-all hover:bg-carbon-800 hover:-translate-y-[0.5px] active:bg-carbon-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Finalizar"
              )}
            </button>
          ) : !isAutoAdvance ? (
            <button
              type="button"
              onClick={goToNextStep}
              disabled={resolution.status === "resolving"}
              className="flex items-center gap-2 h-[44px] px-4 rounded-xl bg-carbon-900 text-white font-bold transition-all hover:bg-carbon-800 hover:-translate-y-[0.5px] active:bg-carbon-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resolution.status === "resolving" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Próximo <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          ) : null}
        </div>
      </QuestionContainer>
    </form>
  );
};

export default ConferenciaCarbonoForm;
