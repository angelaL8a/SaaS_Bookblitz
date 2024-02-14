import NavigationBar from "@/components/admin/navigation-bar";
import ErrorPage from "@/components/error-page";
import Header from "@/components/header";
import { useGetCompany } from "@/hooks/use-company";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { data } = useGetCompany();

  if (data.role !== "Admin") {
    return (
      <ErrorPage
        error="You are not authorized to access this page!"
        status={401}
      />
    );
  }

  return (
    <div className="flex flex-col user_company_bg min-h-screen">
      <Header />

      <NavigationBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
