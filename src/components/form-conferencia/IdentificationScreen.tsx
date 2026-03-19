import { useState } from "react";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import ConferenceHeroBanner, { type BannerVariant } from "./ConferenceHeroBanner";

const identificationSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  telefone: z
    .string()
    .min(10, "Informe um telefone válido com DDD")
    .regex(/^[\d\s()+-]+$/, "Formato de telefone inválido"),
});

interface IdentificationScreenProps {
  variant?: BannerVariant;
  isResolving: boolean;
  onSubmit: (email: string, telefone: string) => Promise<void>;
}

const IdentificationScreen = ({ variant, isResolving, onSubmit }: IdentificationScreenProps) => {
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [errors, setErrors] = useState<{ email?: string; telefone?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    const result = identificationSchema.safeParse({ email, telefone });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof typeof errors;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    try {
      await onSubmit(email, telefone);
    } catch {
      setSubmitError("Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center bg-[#F6F8FB] px-4 md:px-6 py-3 md:py-4">
      <ConferenceHeroBanner variant={variant} />

      <div className="w-full max-w-[980px] mx-auto flex flex-col flex-1">
        <Card className="w-full max-w-[720px] mx-auto bg-white/[0.92] backdrop-blur-[2px] border border-slate-200/80 shadow-[0_8px_30px_rgba(2,6,23,0.08)] rounded-2xl">
          <CardContent className="px-4 md:px-5 pt-5 pb-5">
            <h2 className="text-lg font-bold text-slate-800 mb-1">
              Antes de começar, precisamos te identificar
            </h2>
            <p className="text-sm text-slate-500 mb-5">
              Informe seu e-mail e telefone para iniciarmos o formulário.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="id-email" className="block text-sm font-medium text-slate-700 mb-1">
                  E-mail
                </label>
                <input
                  id="id-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full h-[44px] px-3 rounded-xl border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="id-telefone" className="block text-sm font-medium text-slate-700 mb-1">
                  Telefone (com DDD)
                </label>
                <input
                  id="id-telefone"
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(41) 98765-4321"
                  className="w-full h-[44px] px-3 rounded-xl border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                />
                {errors.telefone && (
                  <p className="text-red-600 text-xs mt-1">{errors.telefone}</p>
                )}
              </div>

              {submitError && (
                <div className="flex items-start gap-2 p-3 rounded-lg text-sm bg-red-50 text-red-800 border border-red-200">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isResolving}
                  className="flex items-center gap-2 h-[44px] px-4 rounded-xl bg-carbon-900 text-white font-bold transition-all hover:bg-carbon-800 hover:-translate-y-[0.5px] active:bg-carbon-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResolving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>Avançar <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IdentificationScreen;
