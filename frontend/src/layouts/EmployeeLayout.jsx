import NavigationBar from "@/components/employee/navigation-bar";
import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen user_company_bg">
      <Header />

      <NavigationBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeLayout;
