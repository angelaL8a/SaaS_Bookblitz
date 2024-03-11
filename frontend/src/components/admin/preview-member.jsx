import PropTypes from "prop-types";
import CustomImage from "../custom-image";
import { XIcon } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { UserIcon } from "../icons";
import { getTableDate } from "@/lib/utils";

const PreviewMember = ({ children, member }) => {
  if (!member) return <div>Something went wrong!</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-full max-w-[1200px] p-0 overflow-hidden">
        <div className="relative flex justify-between w-full mx-auto profile_bg">
          <div className="flex flex-col items-start gap-5 px-4 py-20 mx-auto">
            <CustomImage
              src={member.user?.userImageUrl}
              alt={member.user?.name}
              className="rounded-full h-[180px] w-[180px]"
            />

            <h1 className="text-4xl font-bold truncate">{member.user?.name}</h1>

            <p className="text-[rgba(147,147,147,0.8)] text-3xl">
              {member?.role}
            </p>

            <div className="flex flex-col items-start">
              <p className="text-[rgba(0,0,0,0.5)] text-xl">
                Birthday: {getTableDate(member.birthDate)}
              </p>
              {member?.gender ? (
                <p className="text-[rgba(0,0,0,0.5)] text-xl">
                  Gender: {member?.gender}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-start">
              <p className="text-[rgba(0,0,0,0.5)] text-xl">
                E-mail Address: {member?.email}
              </p>
              {member?.telephone ? (
                <p className="text-[rgba(0,0,0,0.5)] text-xl">
                  Telephone: {member?.telephone}
                </p>
              ) : null}
            </div>
          </div>

          <div className="w-[700px] flex flex-col justify-end px-40">
            <div>
              <UserIcon className="w-full h-full" />
            </div>
          </div>

          <DialogClose asChild>
            <XIcon className="absolute w-10 h-10 cursor-pointer right-4 top-4" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
PreviewMember.propTypes = {
  children: PropTypes.node,
  member: PropTypes.object.isRequired,
};

export default PreviewMember;
