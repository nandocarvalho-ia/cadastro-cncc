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
    <div className="space-y-3 animate-fade-in">
      <Label className="text-base font-medium text-foreground">{question}</Label>
      <Select value={currentValue || ""} onValueChange={(val) => onSelect(id, val)}>
        <SelectTrigger className={error ? "border-destructive" : ""}>
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
