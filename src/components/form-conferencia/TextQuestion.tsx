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
      <Label htmlFor={id} className="text-base font-medium text-foreground">
        {question}
      </Label>
      <Input
        id={id}
        type={type === "phone" ? "tel" : type}
        placeholder={placeholder}
        autoFocus
        {...register(id)}
        className={error ? "border-destructive" : ""}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default TextQuestion;
