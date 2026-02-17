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
    <div className="min-h-[100dvh] flex flex-col items-center bg-[#F6F8FB] px-4 md:px-6 py-3 md:py-4">
      <ConferenceHeroBanner />

      <div className="w-full max-w-[980px] mx-auto flex flex-col flex-1">
        <Card className="w-full max-w-[720px] mx-auto bg-white/[0.92] backdrop-blur-[2px] border border-slate-200/80 shadow-[0_8px_30px_rgba(2,6,23,0.08)] rounded-2xl">
          <CardHeader className="px-4 md:px-5 pt-4 pb-2">
            <div className="flex items-center justify-between text-[13px] mb-2">
              <span className="font-semibold text-slate-500">Pergunta {currentStep + 1} de {totalSteps}</span>
              <span className="font-semibold text-slate-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </CardHeader>
          <CardContent className="px-4 md:px-5 pt-2 pb-4">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestionContainer;
