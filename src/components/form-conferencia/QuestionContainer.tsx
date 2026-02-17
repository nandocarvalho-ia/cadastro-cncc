import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ConferenceHeroBanner from "./ConferenceHeroBanner";

interface QuestionContainerProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

const QuestionContainer = ({ currentStep, totalSteps, children }: QuestionContainerProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F6F8FB] px-4 py-0">
      <ConferenceHeroBanner />

      <div className="w-full max-w-[760px]">
        <div className="text-center mb-6">
          <h1 className="text-[22px] sm:text-[30px] font-extrabold tracking-[0.2px] text-carbon-900 uppercase">
            Conferência Nacional em Créditos de Carbono
          </h1>
          <p className="text-[15px] sm:text-base text-carbon-text-500 mt-1">
            Responda as perguntas abaixo para nos ajudar a personalizar sua experiência.
          </p>
        </div>

        <Card className="bg-white border-[#E7ECF3] shadow-[0_8px_24px_rgba(15,23,42,0.08)] rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium text-carbon-text-500">Pergunta {currentStep + 1} de {totalSteps}</span>
              <span className="font-semibold text-carbon-text-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionContainer;
