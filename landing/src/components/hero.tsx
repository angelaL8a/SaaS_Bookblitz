import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hero = () => {
  return (
    <div className="mt-5 max-w-[900px] mx-auto">
      <h1 className="text-5xl text-center">All in ONE</h1>

      <Carousel className="w-full mt-10 overflow-hidden rounded-lg">
        <CarouselContent className="overflow-hidden rounded-lg">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="h-[450px] aspect-video">
              <div className="w-full h-full overflow-hidden bg-blue-500 rounded-lg">
                {index}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex items-center justify-between gap-5 mt-10">
        <div className="flex flex-col items-start w-1/2 gap-2">
          <h3 className="text-3xl font-bold">
            Full control, from <br /> scheduling to payroll
          </h3>

          <p className="font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            maximus, nulla ut commodo sagittis, sapien dui mattis dui
          </p>

          <div className="flex items-center gap-3">
            <button
              style={{
                borderRadius: "0 15px",
              }}
              className="text-[#F4F4F4] features_btn px-4 py-2"
            >
              Team Scheduling
            </button>

            <button
              style={{
                borderRadius: "0 15px",
              }}
              className="text-[#F4F4F4] features_btn px-4 py-2"
            >
              One-click Payroll
            </button>
          </div>
        </div>

        <div className="w-1/2">
          <img src="/preview.png" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 mt-10">
        <div className="w-1/2">
          <img src="/preview.png" />
        </div>

        <div className="flex flex-col items-start w-1/2 gap-2">
          <h3 className="text-3xl font-bold">
            Full control, from <br /> scheduling to payroll
          </h3>

          <p className="font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            maximus, nulla ut commodo sagittis, sapien dui mattis dui
          </p>

          <div className="flex items-center gap-3">
            <button
              style={{
                borderRadius: "0 15px",
              }}
              className="px-4 py-2 text-white features_btn_v2"
            >
              Team Scheduling
            </button>

            <button
              style={{
                borderRadius: "0 15px",
              }}
              className="px-4 py-2 text-white features_btn_v2"
            >
              One-click Payroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
