import { Input } from "@/components/ui/input";
import { UserIcon } from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="background_color_register_page h-screen">
      <div className="background_img_register_page h-screen">
        <div className="pt-[64px] flex justify-center">
          <div className="py-8 px-10 rounded-[50px] w-[768px] register_card_bg">
            <h1 className="register_button text-[80px] font-semibold text-center">
              Register
            </h1>

            <form className="mt-5 font-spline flex flex-col gap-[20px]">
              {/* Two cols */}
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-4 register_input_name px-5 py-3 w-1/2">
                  <UserIcon
                    className="h-[35px] w-[35px] text-[#A585FF]"
                    strokeWidth={1.5}
                  />

                  <Input
                    placeholder="First Name"
                    className="border-none shadow-none p-0 text-[#6967A6] text-lg placeholder:text-[rgba(105,103,166,0.46)]"
                  />
                </div>

                <div className="flex items-center gap-4 register_input_name px-5 py-3 w-1/2">
                  <UserIcon
                    className="h-[35px] w-[35px] text-[#A585FF]"
                    strokeWidth={1.5}
                  />

                  <Input
                    placeholder="Last Name"
                    className="border-none shadow-none p-0 text-[#6967A6] text-lg placeholder:text-[rgba(105,103,166,0.46)]"
                  />
                </div>
              </div>

              {/* One col */}
              <div className="flex items-center gap-6 register_input_info px-5 py-3 w-full">
                <div>
                  <svg
                    className="h-[30px] w-[30px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 24"
                    fill="none"
                  >
                    <path
                      d="M27 0H3C1.35 0 0.015 1.35 0.015 3L0 21C0 22.65 1.35 24 3 24H27C28.65 24 30 22.65 30 21V3C30 1.35 28.65 0 27 0ZM27 6L15 13.5L3 6V3L15 10.5L27 3V6Z"
                      fill="#6967A6"
                    />
                  </svg>
                </div>

                <div>
                  <p className="font-poppins text-[#6967A6] text-[12px]">
                    Business Email
                  </p>

                  <Input
                    placeholder="example@gmail.com"
                    className="border-none shadow-none h-auto p-0 text-[#6967A6] text-lg placeholder:text-[rgba(105,103,166,0.46)]"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
