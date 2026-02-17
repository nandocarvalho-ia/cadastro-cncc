import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QUESTIONS } from "@/lib/schemas/conferenciaCarbonoSchema";
import ConferenceHeroBanner from "@/components/form-conferencia/ConferenceHeroBanner";

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
    <div className="min-h-screen flex flex-col items-center bg-[#F6F8FB] px-4 py-0">
      <ConferenceHeroBanner />

      <Card className="w-full max-w-md text-center bg-white border-[#E7ECF3] shadow-[0_8px_24px_rgba(15,23,42,0.08)] rounded-2xl">
        <CardHeader className="pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-carbon-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-9 w-9 text-carbon-green-600" />
            </div>
          </div>
          <CardTitle className="text-xl text-carbon-900">Resposta enviada com sucesso!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-carbon-text-500 text-sm">
            Obrigado por contribuir com sua percepção.
          </p>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => navigate("/conferencia-carbono")}
              className="h-12 px-5 rounded-xl bg-carbon-900 text-white font-bold transition-colors hover:bg-carbon-800 active:bg-carbon-700"
            >
              Voltar ao início
            </button>

            {savedData && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center justify-center gap-2 h-12 px-5 rounded-xl border border-carbon-green-500 text-carbon-green-600 font-semibold transition-colors hover:bg-carbon-green-100">
                    <Eye className="h-4 w-4" /> Ver resumo salvo
                  </button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Resumo das respostas</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 text-sm">
                    {Object.entries(savedData).map(([key, value]) => (
                      <div key={key}>
                        <p className="font-medium text-carbon-900">
                          {LABEL_MAP[key] || key}
                        </p>
                        <p className="text-carbon-text-500">{value}</p>
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
