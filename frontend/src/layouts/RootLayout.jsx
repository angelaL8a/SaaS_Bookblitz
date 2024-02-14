import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/use-auth";
import CustomLoader from "@/components/custom-loader";

const RootLayout = () => {
  const { isLoading } = useAuth();

  if (isLoading) return <CustomLoader className="mt-10" />;

  return (
    <div className="min-h-screen w-full">
      <Outlet />

      <Toaster />
    </div>
  );
};

export default RootLayout;
