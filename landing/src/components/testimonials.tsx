const TESTIMONIALS = [
  {
    img: "/person2.png",
    content: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    img: "/person3.png",
    content: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    img: "/person1.png",
    content: "Lorem ipsum dolor sit amet, consectetur",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials_bg">
      <div className="max-w-[1000px] mx-auto py-10">
        <h3 className="text-5xl font-bold text-center font-poppins">
          What our clients have to say
        </h3>

        <div className="flex gap-5 mt-10">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-5 testimonials_card"
            >
              <img
                src={t.img}
                className="h-[150px] w-[150px] rounded-full overflow-hidden"
              />

              <p className="text-2xl text-center font-extralight">
                {t.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
