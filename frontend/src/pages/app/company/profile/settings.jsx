import CustomImage from "@/components/custom-image";
import PropTypes from "prop-types";
import PageContainer from "@/components/page-container";
import { useAuth, useMutateUpdateProfile } from "@/hooks/use-auth";
import { useGetCompany } from "@/hooks/use-company";
import { XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useHandleCatchError } from "@/hooks/use-handle-catch-error";
import { useEffect } from "react";
import CustomLoader from "@/components/custom-loader";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  const navigate = useNavigate();

  const { handleError } = useHandleCatchError();

  const { data: user, refetch } = useAuth();
  const { data: company, refetch: refetchCompany } = useGetCompany();
  const { mutateAsync, isPending } = useMutateUpdateProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [telephone, setTelephone] = useState("");

  const userInCompany = company?.users?.find((u) => u.user.id === user?.id);

  useEffect(() => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setGender(userInCompany?.gender);
    setTelephone(userInCompany?.telephone);
  }, [user, userInCompany]);

  const updateProfile = async () => {
    if (!company) return;

    try {
      const data = await mutateAsync({
        userDto: {
          firstName,
          lastName,
          gender,
          telephone,
        },
        companyUrl: company.url,
      });

      if (data) {
        refetch();
        refetchCompany();

        return;
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <PageContainer>
      <div className="relative flex justify-between mt-10 rounded-lg profile_bg max-w-[1300px] mx-auto">
        <div className="flex items-start justify-between w-full gap-10 p-20">
          <div className="w-1/2">
            <CustomImage
              src={user?.userImageUrl}
              className="h-[470px] w-[470px] rounded-full"
            />
          </div>

          <div className="flex flex-col items-start w-1/2 gap-2">
            <h1 className="text-[rgba(90,90,90,0.65)] text-4xl">
              Administrator
            </h1>

            <InputSettings
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />

            <InputSettings
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />

            <Separator className="my-3 w-[350px]" />

            <InputSettings label="Gender">
              <Select
                onValueChange={(value) => {
                  setGender(value);
                }}
                value={gender}
                name="gender"
              >
                <SelectTrigger
                  className={cn(
                    "w-full h-auto font-normal bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] px-3 py-3 rounded-md text-[rgba(51,51,51,0.41)] border-none text-lg"
                  )}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </InputSettings>

            <InputSettings
              label="Telephone"
              onChange={(e) => setTelephone(e.target.value)}
              value={telephone}
            />

            <div className="flex justify-center w-[350px]">
              <button
                type="button"
                onClick={() => updateProfile()}
                className="bg-[rgba(240,240,243,1)] px-10 py-2 rounded-full text-[#828282] disabled:cursor-not-allowed gap-2 flex items-center"
                disabled={
                  isPending || !firstName || !lastName || !gender || !telephone
                }
              >
                {isPending ? (
                  <CustomLoader className="w-5 h-5" containerClassName="mt-0" />
                ) : null}

                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        <XIcon
          className="absolute w-10 h-10 cursor-pointer right-4 top-4"
          onClick={() =>
            navigate(`/app/${company?.url}/${company?.role.toLowerCase()}`)
          }
        />
      </div>
    </PageContainer>
  );
};

const InputSettings = ({ label, onChange, value, children }) => {
  return (
    <div className="flex flex-col items-start mb-4 w-[350px]">
      <label className="text-[rgba(139,139,139,1)] font-poppins">{label}</label>

      {children ? (
        children
      ) : (
        <input
          className="w-full px-5 py-4 bg-white rounded-lg outline-none font-poppins"
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
};
InputSettings.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  children: PropTypes.node,
};

export default SettingsPage;
