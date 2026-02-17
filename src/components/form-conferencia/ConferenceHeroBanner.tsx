import bannerImg from "@/assets/banner-conferencia.png";

const ConferenceHeroBanner = () => {
  return (
    <div className="w-full flex justify-center mt-3 lg:mt-4 mb-3 md:mb-4">
      <div className="relative w-full max-w-[1280px] rounded-2xl overflow-hidden h-[100px] sm:h-[130px] lg:h-[170px]">
        <img
          src={bannerImg}
          alt="Banner Conferência Nacional em Créditos de Carbono"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/[0.10] rounded-2xl" />
      </div>
    </div>
  );
};

export default ConferenceHeroBanner;
