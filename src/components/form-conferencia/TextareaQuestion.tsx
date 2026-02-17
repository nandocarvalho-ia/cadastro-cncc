import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { ConferenceFormData } from "@/lib/schemas/conferenciaCarbonoSchema";

interface TextareaQuestionProps {
  id: keyof ConferenceFormData;
  question: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegister<ConferenceFormData>;
  watch: UseFormWatch<ConferenceFormData>;
}

const TextareaQuestion = ({ id, question, placeholder, error, register, watch }: TextareaQuestionProps) => {
  const value = watch(id) || "";

  return (
    <div className="space-y-3 animate-fade-in">
      <Label htmlFor={id} className="text-base font-medium text-foreground">
        {question}
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        rows={4}
        autoFocus
        {...register(id)}
        className={error ? "border-destructive" : ""}
      />
      <div className="flex items-center justify-between">
        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <span />
        )}
        <span className="text-xs text-muted-foreground">{value.length} caracteres</span>
      </div>
    </div>
  );
};

export default TextareaQuestion;
