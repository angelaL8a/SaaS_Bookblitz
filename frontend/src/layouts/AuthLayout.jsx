import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { data } = useAuth();

  if (data) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
