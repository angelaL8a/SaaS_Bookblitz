import CustomImage from "../custom-image";
import SelectCompany from "./select-company";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/use-logout";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const { data } = useAuth();
  const { logout } = useLogout();

  return (
    <header className="h-[60px] flex justify-between items-center px-4">
      <SelectCompany />

      <div className="flex items-center gap-3">
        <CustomImage
          src={data.userImageUrl}
          className="h-10 w-10 rounded-full border"
        />

        <Button
          type="button"
          onClick={() => logout()}
          className="rounded-[8px] h-10 px-10 font-semibold font-poppins bg-gradient-to-b from-white from-0% to-[rgba(255,255,255,0.90)] to-100% drop-shadow-[1px_1px_2.1px_rgba(0,0,0,0.14)] text-[#727272]"
          variant={"unstyled"}
        >
          Log out
        </Button>
      </div>
    </header>
  );
};

export default Header;
