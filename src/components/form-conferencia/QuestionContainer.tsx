import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuestionContainerProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

const QuestionContainer = ({ currentStep, totalSteps, children }: QuestionContainerProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground uppercase">
            Conferência Nacional em Créditos de Carbono
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Responda as perguntas abaixo para nos ajudar a personalizar sua experiência.
          </p>
        </div>

        <Card className="shadow-lg border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Pergunta {currentStep + 1} de {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
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
