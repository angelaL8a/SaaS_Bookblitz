import CustomImage from "../custom-image";
import SelectCompany from "./select-company";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/use-logout";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { useGetCompany } from "@/hooks/use-company";

const Header = () => {
  const { data } = useAuth();
  const { data: company } = useGetCompany();
  const { logout } = useLogout();

  return (
    <header className="h-[60px] flex justify-between items-center px-4">
      <SelectCompany />

      <div className="flex items-center gap-3">
        <Link to={`/app/${company?.url}/profile`}>
          <CustomImage
            src={data?.userImageUrl}
            className="w-10 h-10 border rounded-full"
          />
        </Link>

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
