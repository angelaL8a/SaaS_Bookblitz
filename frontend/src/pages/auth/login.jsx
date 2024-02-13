import OneColInput from "@/components/auth/one-col-input";
import { Button } from "@/components/ui/button";
import { KeyRoundIcon } from "lucide-react";
import { PencilLineIcon } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="background_color_register_page min-h-screen">
      <div className="background_img_register_page min-h-screen flex items-center h-full w-full justify-center p-5">
        <div className="p-6 lg:py-8 lg:px-10 rounded-[50px] w-[768px] login_card_bg">
          <h1 className="login_text text-[40px] lg:text-[80px] font-semibold text-center">
            Welcome Back
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              console.log("register");
            }}
            className="mt-5 font-spline flex flex-col gap-[20px]"
          >
            {/* Username */}
            <OneColInput
              icon={<PencilLineIcon className="h-8 w-8 text-[#5572A8]" />}
              label="Username"
              placeholder="o_Brian56"
              className="text-[#5572A8]"
              labelClassName="text-[#5572A8]"
            />

            {/* Password  */}
            <OneColInput
              icon={<KeyRoundIcon className="h-8 w-8 text-[#5572A8]" />}
              label="Password"
              placeholder="*********"
              type="password"
              className="text-[#5572A8]"
              labelClassName="text-[#5572A8]"
            />
            {/* Sign in  */}
            <Button
              variant="auth_secondary"
              type="submit"
              className="font-poppins py-8 mt-3 text-[16px]"
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
