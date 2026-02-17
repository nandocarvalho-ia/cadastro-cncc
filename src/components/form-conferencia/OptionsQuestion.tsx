import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ConferenceFormData } from "@/lib/schemas/conferenciaCarbonoSchema";

interface OptionsQuestionProps {
  id: keyof ConferenceFormData;
  question: string;
  options: string[];
  currentValue?: string;
  error?: string;
  onSelect: (id: keyof ConferenceFormData, value: string) => void;
}

const OptionsQuestion = ({ id, question, options, currentValue, error, onSelect }: OptionsQuestionProps) => {
  return (
    <div className="space-y-3 animate-fade-in">
      <Label className="text-base font-medium text-foreground">{question}</Label>
      <div className="grid gap-2">
        {options.map((option) => {
          const isSelected = currentValue === option;
          return (
            <Button
              key={option}
              type="button"
              variant={isSelected ? "default" : "outline"}
              className={`justify-start text-left h-auto py-3 px-4 whitespace-normal ${
                isSelected ? "" : "hover:bg-accent"
              }`}
              onClick={() => onSelect(id, option)}
            >
              {isSelected && <Check className="mr-2 h-4 w-4 shrink-0" />}
              <span>{option}</span>
            </Button>
          );
        })}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default OptionsQuestion;
