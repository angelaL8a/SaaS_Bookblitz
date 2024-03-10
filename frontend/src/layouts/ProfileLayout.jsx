import Header from "@/components/header";
import ProfileNavBar from "@/profile-nav-bar";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="flex flex-col min-h-screen page_profile_bg">
      <Header />

      <ProfileNavBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
