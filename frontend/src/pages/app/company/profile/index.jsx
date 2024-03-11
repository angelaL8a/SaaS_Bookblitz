import CustomImage from "@/components/custom-image";
import PageContainer from "@/components/page-container";
import { UserIcon } from "@/components/icons";
import { useAuth } from "@/hooks/use-auth";
import { useGetCompany } from "@/hooks/use-company";
import { getTableDate } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { data: user } = useAuth();
  const { data: company } = useGetCompany();

  const userInCompany = company?.users?.find((u) => u.user.id === user?.id);

  return (
    <PageContainer>
      <div className="relative flex justify-between mt-10 rounded-lg profile_bg max-w-[1300px] mx-auto shadow-[0px_0px_11px_0px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col items-start gap-5 px-4 py-20 mx-auto">
          <CustomImage
            src={user?.userImageUrl}
            alt={user?.name}
            className="rounded-full h-[180px] w-[180px]"
          />

          <h1 className="text-4xl font-semibold font-poppins text-muted-foreground">
            {user?.name}
          </h1>

          <p className="text-[rgba(147,147,147,0.8)] text-3xl">
            {company?.role}
          </p>

          <div className="flex flex-col items-start">
            <p className="text-[rgba(0,0,0,0.5)] text-xl">
              Birthday: {getTableDate(user?.createdAt)}
            </p>
            {userInCompany?.gender ? (
              <p className="text-[rgba(0,0,0,0.5)] text-xl">
                Gender: {userInCompany?.gender}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col items-start">
            <p className="text-[rgba(0,0,0,0.5)] text-xl">
              E-mail Address: {userInCompany?.email}
            </p>
            {userInCompany?.telephone ? (
              <p className="text-[rgba(0,0,0,0.5)] text-xl">
                Telephone: {userInCompany?.telephone}
              </p>
            ) : null}
          </div>
        </div>

        <div className="w-[700px] flex flex-col justify-end px-40">
          <div>
            <UserIcon className="w-full h-full" />
          </div>
        </div>

        <XIcon
          className="absolute w-10 h-10 cursor-pointer text-muted-foreground right-4 top-4"
          onClick={() =>
            navigate(`/app/${company?.url}/${company?.role.toLowerCase()}`)
          }
        />
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
