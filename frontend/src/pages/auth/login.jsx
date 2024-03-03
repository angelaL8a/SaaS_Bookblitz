import OneColInput from "@/components/auth/one-col-input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutateLoginUser } from "@/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { KeyRoundIcon } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import { PencilLineIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const { isPending, mutateAsync } = useMutateLoginUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  /**
   * Function to handle user login.
   * Initiates the login process by sending a request with the provided username and password.
   * If successful, it clears the input fields and stores the JWT token in local storage.
   * Displays an error toast if login fails.
   */
  const login = async () => {
    try {
      const data = await mutateAsync({
        username,
        password,
      });

      if (data) {
        // Clear input fields after successful login
        setUsername("");
        setPassword("");

        // Set the jwt token in local storage
        localStorage.setItem("token", data);

        // Clear the cache
        await queryClient.clear();

        // Redirect the user
        navigate(`/`);
      }
    } catch (error) {
      // Display error message using toast if login fails
      error?.response?.errors?.map((err) => {
        toast({
          description: err?.message,
        });
      });
    }
  };

  return (
    <div className="min-h-screen background_color_register_page">
      <div className="flex items-center justify-center w-full h-full min-h-screen p-5 background_img_register_page">
        <div className="p-6 lg:py-8 lg:px-10 rounded-[50px] w-[768px] login_card_bg">
          <h1 className="login_text text-[40px] lg:text-[80px] font-semibold text-center">
            Welcome Back
          </h1>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              await login();
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
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            {/* Password  */}
            <OneColInput
              icon={<KeyRoundIcon className="h-8 w-8 text-[#5572A8]" />}
              label="Password"
              placeholder="*********"
              type="password"
              className="text-[#5572A8]"
              labelClassName="text-[#5572A8]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {/* Sign in  */}
            <Button
              variant="auth_secondary"
              type="submit"
              className="font-poppins py-8 mt-3 text-[16px]"
              disabled={!username || !password || isPending}
            >
              {isPending ? (
                <Loader2Icon className="w-5 h-5 mr-2 animate-spin" />
              ) : null}
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
