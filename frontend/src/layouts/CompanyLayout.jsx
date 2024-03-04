import CustomLoader from "@/components/custom-loader";
import ErrorPage from "@/components/error-page";
import { useGetCompany } from "@/hooks/use-company";
import { Outlet } from "react-router-dom";

const CompanyLayout = () => {
  const { data, isLoading } = useGetCompany();

  if (isLoading) {
    return <CustomLoader />;
  }

  if (!isLoading && !data)
    return <ErrorPage error="Company not found." status={404} />;

  return <Outlet />;
};

export default CompanyLayout;
