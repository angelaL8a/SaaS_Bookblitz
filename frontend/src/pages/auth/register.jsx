import OneColInput from "@/components/auth/one-col-input";
import { MailIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutateRegisterUser } from "@/hooks/use-auth";
import { Loader2Icon } from "lucide-react";
import {
  KeyRoundIcon,
  PencilLineIcon,
  UserIcon,
  Building2Icon,
  LinkIcon,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutateRegisterUser();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");

  /**
   * Function to handle user registration.
   * Initiates the registration process by calling the mutation function with user data.
   * Resets form fields on successful registration.
   * Displays error messages using toast notifications if registration fails.
   */
  const register = async () => {
    try {
      // Call the mutateAsync function with user data to register the user
      const data = await mutateAsync({
        firstName,
        lastName,
        email: businessEmail,
        username: username,
        password: password,
        companyName: companyName,
        companyURL: companyUrl,
      });
      // Reset form fields if registration is successful
      if (data) {
        setFirstName("");
        setLastName("");
        setBusinessEmail("");
        setUsername("");
        setPassword("");
        setCompanyName("");
        setCompanyUrl("");

        navigate(`/app/${"companyName"}/admin`);
      }
    } catch (error) {
      // Handle errors and display error messages using toast notifications
      error?.response?.errors?.map((err) => {
        toast({
          description: err?.message,
        });
      });
    }
  };

  return (
    <div className="background_color_register_page min-h-screen">
      <div className="background_img_register_page min-h-screen flex items-center h-full w-full justify-center p-5">
        <div className="p-6 lg:py-8 lg:px-10 rounded-[50px] w-[768px] register_card_bg">
          <h1 className="register_button text-[40px] lg:text-[80px] font-semibold text-center">
            Register
          </h1>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              await register();
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
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
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
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
            </div>

            {/* Business Email */}
            <OneColInput
              icon={<MailIcon />}
              label="Business Email"
              placeholder="example@gmail.com"
              onChange={(e) => setBusinessEmail(e.target.value)}
              type="email"
              value={businessEmail}
            />

            {/* Username */}
            <OneColInput
              icon={<PencilLineIcon className="h-8 w-8 text-[#6967A6]" />}
              label="Username"
              placeholder="o_Brian56"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            {/* Password  */}
            <OneColInput
              icon={<KeyRoundIcon className="h-8 w-8 text-[#6967A6]" />}
              label="Password"
              placeholder="*********"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {/* Company Name  */}
            <OneColInput
              icon={<Building2Icon className="h-8 w-8 text-[#6967A6]" />}
              label="Company Name"
              placeholder="Umbrella Corporation"
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
            />

            {/* Company URL  */}
            <OneColInput
              icon={<LinkIcon className="h-8 w-8 text-[#6967A6]" />}
              label="Company URL"
              placeholder="umbrella-corporation"
              onChange={(e) => setCompanyUrl(e.target.value)}
              value={companyUrl}
            />

            <Button
              variant="auth"
              type="submit"
              className="font-poppins py-8 mt-3 text-[16px]"
              disabled={
                !firstName ||
                !lastName ||
                !businessEmail ||
                !username ||
                !password ||
                !companyName ||
                !companyUrl ||
                isPending
              }
            >
              {isPending ? (
                <Loader2Icon className="animate-spin h-5 w-5 mr-2" />
              ) : null}
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
