import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ConferenceHeroBanner from "@/components/form-conferencia/ConferenceHeroBanner";
import { getVariantFromPath, getFormPath } from "@/lib/getVariantFromPath";

const ConferenciaCarbonoSucesso = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const variant = getVariantFromPath(location.pathname);
  const submissionStatus = (location.state as any)?.submissionStatus as string | undefined;
  const isDraft = submissionStatus === "draft_saved";

  return (
    <div className="min-h-[100dvh] flex flex-col items-center bg-[#F6F8FB] px-4 md:px-6 py-3 md:py-4">
      <ConferenceHeroBanner variant={variant} />

      <div className="w-full max-w-[980px] mx-auto flex flex-col flex-1 items-center">
        <Card className="w-full max-w-[420px] text-center bg-white/[0.92] backdrop-blur-[2px] border border-slate-200/80 shadow-[0_8px_30px_rgba(2,6,23,0.08)] rounded-2xl">
          <CardHeader className="px-4 md:px-5 pt-5 pb-2">
            <div className="flex justify-center mb-3">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isDraft ? "bg-amber-100" : "bg-carbon-green-100"}`}>
                {isDraft ? (
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                ) : (
                  <CheckCircle2 className="h-8 w-8 text-carbon-green-600" />
                )}
              </div>
            </div>
            <CardTitle className="text-xl text-carbon-900">
              {isDraft ? "Respostas recebidas!" : "Resposta enviada com sucesso!"}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 md:px-5 pt-1 pb-5 space-y-3">
            <p className="text-carbon-text-500 text-sm">
              {isDraft
                ? "Suas respostas foram recebidas e estão em análise de vinculação. Entraremos em contato se necessário."
                : "Obrigado por contribuir com sua percepção."}
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => navigate(getFormPath(variant))}
                className="h-[44px] px-4 rounded-xl bg-carbon-900 text-white font-bold transition-all hover:bg-carbon-800 hover:-translate-y-[0.5px] active:bg-carbon-700"
              >
                Voltar ao início
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConferenciaCarbonoSucesso;
