import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QUESTIONS } from "@/lib/schemas/conferenciaCarbonoSchema";

const LABEL_MAP: Record<string, string> = {};
QUESTIONS.forEach((q) => {
  LABEL_MAP[q.id] = q.question;
});

const ConferenciaCarbonoSucesso = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const getSavedData = (): Record<string, string> | null => {
    try {
      const raw = localStorage.getItem("conferencia-carbono-last-submission");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const savedData = getSavedData();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md text-center shadow-lg border-border">
        <CardHeader className="pb-2">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-xl">Resposta enviada com sucesso!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Obrigado por contribuir com sua percepção.
          </p>

          <div className="flex flex-col gap-2 pt-2">
            <Button onClick={() => navigate("/conferencia-carbono")}>
              Voltar ao início
            </Button>

            {savedData && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Eye className="h-4 w-4" /> Ver resumo salvo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Resumo das respostas</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 text-sm">
                    {Object.entries(savedData).map(([key, value]) => (
                      <div key={key}>
                        <p className="font-medium text-foreground">
                          {LABEL_MAP[key] || key}
                        </p>
                        <p className="text-muted-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConferenciaCarbonoSucesso;
