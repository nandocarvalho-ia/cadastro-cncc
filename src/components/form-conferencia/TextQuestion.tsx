import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister } from "react-hook-form";
import { ConferenceFormData } from "@/lib/schemas/conferenciaCarbonoSchema";

interface TextQuestionProps {
  id: keyof ConferenceFormData;
  question: string;
  type: "text" | "email" | "phone";
  placeholder?: string;
  error?: string;
  register: UseFormRegister<ConferenceFormData>;
}

const TextQuestion = ({ id, question, type, placeholder, error, register }: TextQuestionProps) => {
  return (
    <div className="space-y-3 animate-fade-in">
      <Label htmlFor={id} className="text-[20px] sm:text-[22px] font-bold text-carbon-900">
        {question}
      </Label>
      <Input
        id={id}
        type={type === "phone" ? "tel" : type}
        placeholder={placeholder}
        autoFocus
        {...register(id)}
        className={`h-[52px] rounded-xl border-[#D7DEE8] text-carbon-900 placeholder:text-carbon-text-500 focus-visible:border-carbon-green-500 focus-visible:ring-4 focus-visible:ring-[rgba(63,163,77,0.18)] ${error ? "border-destructive" : ""}`}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default TextQuestion;
