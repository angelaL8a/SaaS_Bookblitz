import PropTypes from "prop-types";
import CustomImage from "../custom-image";
import { shuffle } from "lodash";
import {
  cn,
  convertTime,
  extractDateInfo,
  gradientPastelColors,
} from "@/lib/utils";
import Avatar from "../avatar";
import { useMemo } from "react";

const Appointment = ({ apt, setSelectedApt }) => {
  const bgColor = useMemo(() => {
    return shuffle(gradientPastelColors()).pop();
  }, []);

  const dateInfo = extractDateInfo(apt.date);

  const user = apt.client ? apt.client?.user : apt.employee?.user;

  return (
    <button
      type="button"
      onClick={() => setSelectedApt(apt)}
      className="overflow-hidden rounded-lg shadow-[0px_9.92px_39.69px_-18px_rgba(0,0,0,0.25)]"
    >
      <CustomImage
        src={apt.referencialImageUrl}
        className={`aspect-w-14 aspect-h-7 relative w-full h-[90px] ${bgColor.color}`}
      />

      <div className="relative flex flex-col items-start gap-2 p-4 bg-white">
        <div className="absolute flex flex-col items-start -mt-12 font-poppins">
          <div
            className={cn(
              "rounded-md px-4 py-1 shadow-[0px_2px_2.6px_0px_rgba(0,0,0,0.13)] bg-[#FCFCFC]",
              "h-14 flex items-center justify-center flex-col"
            )}
          >
            <span className={`text-2xl text-muted-foreground`}>
              {dateInfo.dayNumber}
            </span>

            <span className={`-mt-2 text-muted-foreground`}>
              {dateInfo.monthName}
            </span>
          </div>
        </div>

        <h3 className="text-[#2B2B2B] text-lg mt-6 leading-3">{apt.title}</h3>

        <div className="text-[#515151]">
          {convertTime(apt.startTime)} - {convertTime(apt.endTime)}
        </div>

        {user ? (
          <Avatar
            firstName={user?.firstName}
            lastName={user?.lastName}
            userImageUrl={user?.userImageUrl}
            name={user?.name}
          />
        ) : (
          <div>No client.</div>
        )}
      </div>
    </button>
  );
};
Appointment.propTypes = {
  apt: PropTypes.object.isRequired,
  setSelectedApt: PropTypes.func.isRequired,
};

export default Appointment;
