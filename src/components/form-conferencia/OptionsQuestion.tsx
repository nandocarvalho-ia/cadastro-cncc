import { Label } from "@/components/ui/label";
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
      <Label className="text-[20px] sm:text-[22px] font-bold text-carbon-900">{question}</Label>
      <div className="grid gap-2">
        {options.map((option) => {
          const isSelected = currentValue === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(id, option)}
              className={`flex items-center justify-between text-left w-full py-3 px-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-carbon-green-100 border-carbon-green-600 text-carbon-green-600 font-medium"
                  : "bg-white border-[#DCE3EE] text-carbon-800 hover:bg-[#F8FBF8] hover:border-carbon-green-500 hover:-translate-y-[1px]"
              }`}
            >
              <span>{option}</span>
              {isSelected && <Check className="h-4 w-4 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default OptionsQuestion;
