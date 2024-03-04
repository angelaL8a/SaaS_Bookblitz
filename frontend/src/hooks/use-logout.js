import { useGetCurrentCompany } from "@/store/company-store";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { setCurrentCompany } = useGetCurrentCompany();

  const logout = async () => {
    setCurrentCompany(null);
    localStorage.removeItem("token");

    // Clear the cache
    await queryClient.clear();

    navigate("/welcome");
  };

  return { logout };
};
