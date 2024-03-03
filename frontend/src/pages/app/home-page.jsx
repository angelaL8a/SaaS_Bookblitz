import { useAuth } from "@/hooks/use-auth";
import { useGetCurrentCompany } from "@/store/company-store";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { data } = useAuth();
  const { currentCompany } = useGetCurrentCompany();

  if (data) {
    if (currentCompany) {
      return <Navigate to={`/app/${currentCompany?.url}/admin`} replace />;
    } else {
      const company = data?.companies[0];

      if (company.role === "Admin") {
        return <Navigate to={`/app/${company.url}/admin`} replace />;
      } else if (company.role === "Client") {
        return <Navigate to={`/app/${company.url}/client`} replace />;
      } else if (company.role === "Employee") {
        return <Navigate to={`/app/${company.url}/employee`} replace />;
      }
    }
  }

  return <Navigate to={`/welcome`} replace />;
};

export default HomePage;
