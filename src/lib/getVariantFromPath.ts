import type { BannerVariant } from "@/components/form-conferencia/ConferenceHeroBanner";

export function getVariantFromPath(pathname: string): BannerVariant {
  if (pathname.includes("protocolo")) return "protocolo";
  if (pathname.includes("workshop")) return "workshop";
  return "conferencia";
}

export function getSuccessPath(variant: BannerVariant): string {
  switch (variant) {
    case "protocolo": return "/protocolo-definitivo/sucesso";
    case "workshop": return "/workshop-carbono/sucesso";
    default: return "/conferencia-carbono/sucesso";
  }
}

export function getFormPath(variant: BannerVariant): string {
  switch (variant) {
    case "protocolo": return "/protocolo-definitivo";
    case "workshop": return "/workshop-carbono";
    default: return "/conferencia-carbono";
  }
}
