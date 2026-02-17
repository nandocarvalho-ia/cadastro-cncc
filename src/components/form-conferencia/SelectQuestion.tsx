import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConferenceFormData } from "@/lib/schemas/conferenciaCarbonoSchema";

interface SelectQuestionProps {
  id: keyof ConferenceFormData;
  question: string;
  options: string[];
  currentValue?: string;
  error?: string;
  onSelect: (id: keyof ConferenceFormData, value: string) => void;
}

const SelectQuestion = ({ id, question, options, currentValue, error, onSelect }: SelectQuestionProps) => {
  return (
    <div className="space-y-2 animate-fade-in">
      <Label className="text-[22px] md:text-[24px] font-bold text-[#0B1220]">{question}</Label>
      <Select value={currentValue || ""} onValueChange={(val) => onSelect(id, val)}>
        <SelectTrigger
          className={`h-[46px] rounded-xl border-[#D7DEE8] text-carbon-900 placeholder:text-carbon-text-500 focus:border-carbon-green-500 focus:ring-4 focus:ring-[rgba(63,163,77,0.18)] ${error ? "border-destructive" : ""}`}
        >
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default SelectQuestion;
