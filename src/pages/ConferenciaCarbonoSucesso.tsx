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
    <div className="min-h-[100dvh] flex flex-col items-center bg-[#F6F8FB] px-4 md:px-6 py-3 md:py-4">
      <ConferenceHeroBanner />

      <div className="w-full max-w-[980px] mx-auto flex flex-col flex-1 items-center">
        <Card className="w-full max-w-[420px] text-center bg-white/[0.92] backdrop-blur-[2px] border border-slate-200/80 shadow-[0_8px_30px_rgba(2,6,23,0.08)] rounded-2xl">
          <CardHeader className="px-4 md:px-5 pt-5 pb-2">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-carbon-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-carbon-green-600" />
              </div>
            </div>
            <CardTitle className="text-xl text-carbon-900">Resposta enviada com sucesso!</CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-5 pt-1 pb-5 space-y-3">
            <p className="text-carbon-text-500 text-sm">
              Obrigado por contribuir com sua percepção.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => navigate("/conferencia-carbono")}
                className="h-[44px] px-4 rounded-xl bg-carbon-900 text-white font-bold transition-all hover:bg-carbon-800 hover:-translate-y-[0.5px] active:bg-carbon-700"
              >
                Voltar ao início
              </button>

              {savedData && (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <button className="flex items-center justify-center gap-2 h-[44px] px-4 rounded-xl border border-carbon-green-500 text-carbon-green-600 font-semibold transition-colors hover:bg-carbon-green-100">
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
    </div>
  );
};

export default ConferenciaCarbonoSucesso;
