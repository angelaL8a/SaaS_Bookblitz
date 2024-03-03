import { useGetCurrentCompany } from "@/store/company-store";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setCurrentCompany } = useGetCurrentCompany();

  const logout = () => {
    setCurrentCompany(null);
    localStorage.removeItem("token");
    navigate(0);
  };

  return { logout };
};
