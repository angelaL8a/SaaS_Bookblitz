import { useAuth } from "@/hooks/use-auth";
import { useGetCurrentCompany } from "@/store/company-store";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { data } = useAuth();
  const { currentCompany } = useGetCurrentCompany();

  const getUrlRole = (role) => {
    if (role === "Admin") {
      return "admin";
    } else if (role === "Client") {
      return "client";
    } else if (role === "Employee") {
      return "employee";
    }
  };

  if (data) {
    if (currentCompany) {
      return (
        <Navigate
          to={`/app/${currentCompany?.url}/${getUrlRole(currentCompany.role)}`}
          replace
        />
      );
    } else {
      const company = data?.companies[0];

      return (
        <Navigate
          to={`/app/${company.url}/${getUrlRole(company.role)}`}
          replace
        />
      );
    }
  }

  return <Navigate to={`/welcome`} replace />;
};

export default HomePage;
