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
    <div className="space-y-2 animate-fade-in">
      <Label htmlFor={id} className="text-[22px] md:text-[24px] font-bold text-[#0B1220]">
        {question}
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        rows={3}
        autoFocus
        {...register(id)}
        className={`rounded-xl border-[#D7DEE8] text-carbon-900 placeholder:text-carbon-text-500 focus-visible:border-carbon-green-500 focus-visible:ring-4 focus-visible:ring-[rgba(63,163,77,0.18)] ${error ? "border-destructive" : ""}`}
      />
      <div className="flex items-center justify-between">
        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <span />
        )}
        <span className="text-xs text-carbon-text-500">{value.length} caracteres</span>
      </div>
    </div>
  );
};

export default TextareaQuestion;
