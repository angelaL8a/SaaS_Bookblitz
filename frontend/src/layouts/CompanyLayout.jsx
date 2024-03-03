import CustomLoader from "@/components/custom-loader";
import ErrorPage from "@/components/error-page";
import { useGetCompany } from "@/hooks/use-company";
import { Outlet } from "react-router-dom";

const CompanyLayout = () => {
  const { data, isPending } = useGetCompany();

  if (isPending) {
    return <CustomLoader />;
  }

  if (!isPending && !data)
    return <ErrorPage error="Company not found." status={404} />;

  return <Outlet />;
};

export default CompanyLayout;
