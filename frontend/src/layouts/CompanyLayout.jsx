import CustomLoader from "@/components/custom-loader";
import { useGetCompany } from "@/hooks/use-company";
import { Outlet } from "react-router-dom";

const CompanyLayout = () => {
  const { data, isPending } = useGetCompany();

  if (isPending) {
    return <CustomLoader />;
  }

  if (!isPending && !data) return <div>Company not found!</div>;

  return <Outlet />;
};

export default CompanyLayout;
