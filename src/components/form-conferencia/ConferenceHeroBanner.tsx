import bannerImg from "@/assets/banner-conferencia.png";

const ConferenceHeroBanner = () => {
  return (
    <div className="w-full flex justify-center mt-5 lg:mt-7 mb-6">
      <div className="relative w-full max-w-[1280px] rounded-[20px] overflow-hidden h-[140px] sm:h-[220px] lg:h-[300px]">
        <img
          src={bannerImg}
          alt="Banner Conferência Nacional em Créditos de Carbono"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/[0.14] rounded-[20px]" />
      </div>
    </div>
  );
};

export default ConferenceHeroBanner;
