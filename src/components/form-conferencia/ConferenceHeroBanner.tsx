import bannerConferencia from "@/assets/banner-conferencia.png";
import bannerProtocolo from "@/assets/banner-protocolo.png";
import bannerWorkshop from "@/assets/banner-workshop.png";

export type BannerVariant = "conferencia" | "protocolo" | "workshop";

const bannerMap: Record<BannerVariant, string> = {
  conferencia: bannerConferencia,
  protocolo: bannerProtocolo,
  workshop: bannerWorkshop,
};

interface ConferenceHeroBannerProps {
  variant?: BannerVariant;
}

const ConferenceHeroBanner = ({ variant = "conferencia" }: ConferenceHeroBannerProps) => {
  return (
    <div className="w-full flex justify-center mt-3 lg:mt-4 mb-3 md:mb-4">
      <div className="relative w-full max-w-[1280px] rounded-2xl overflow-hidden h-[100px] sm:h-[130px] lg:h-[170px]">
        <img
          src={bannerMap[variant]}
          alt="Banner do evento"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/[0.10] rounded-2xl" />
      </div>
    </div>
  );
};

export default ConferenceHeroBanner;
