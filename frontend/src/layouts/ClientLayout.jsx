import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="flex flex-col min-h-screen user_company_bg">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ClientLayout;
