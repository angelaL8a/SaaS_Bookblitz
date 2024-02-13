import OneColInput from "@/components/auth/one-col-input";
import { MailIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  KeyRoundIcon,
  PencilLineIcon,
  UserIcon,
  Building2Icon,
  LinkIcon,
} from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="background_color_register_page min-h-screen">
      <div className="background_img_register_page min-h-screen flex items-center h-full w-full justify-center p-5">
        <div className="p-6 lg:py-8 lg:px-10 rounded-[50px] w-[768px] register_card_bg">
          <h1 className="register_button text-[40px] lg:text-[80px] font-semibold text-center">
            Register
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              console.log("register");
            }}
            className="mt-5 font-spline flex flex-col gap-[20px]"
          >
            {/* Two cols (first name - last name)*/}
            <div className="flex flex-col lg:flex-row items-center gap-5">
              <div className="flex items-center gap-4 register_input_name px-5 py-3 w-full lg:w-1/2">
                <UserIcon
                  className="h-[35px] w-[35px] text-[#A585FF]"
                  strokeWidth={1.5}
                />

                <Input
                  placeholder="First Name"
                  className="border-none shadow-none p-0 text-[#6967A6] text-lg placeholder:text-[rgba(105,103,166,0.46)]"
                />
              </div>

              <div className="flex items-center gap-4 register_input_name px-5 py-3 w-full lg:w-1/2">
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

            {/* Business Email */}
            <OneColInput
              icon={<MailIcon />}
              label="Business Email"
              placeholder="example@gmail.com"
            />

            {/* Username */}
            <OneColInput
              icon={<PencilLineIcon className="h-8 w-8 text-[#6967A6]" />}
              label="Username"
              placeholder="o_Brian56"
            />

            {/* Password  */}
            <OneColInput
              icon={<KeyRoundIcon className="h-8 w-8 text-[#6967A6]" />}
              label="Password"
              placeholder="*********"
              type="password"
            />

            {/* Company Name  */}
            <OneColInput
              icon={<Building2Icon className="h-8 w-8 text-[#6967A6]" />}
              label="Company Name"
              placeholder="Umbrella Corporation"
            />

            {/* Company URL  */}
            <OneColInput
              icon={<LinkIcon className="h-8 w-8 text-[#6967A6]" />}
              label="Company URL"
              placeholder="umbrella-corporation"
            />

            <Button
              variant="auth"
              type="submit"
              className="font-poppins py-8 mt-3 text-[16px]"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
