import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import { useMemo } from "react";

const WeekDay = ({ day }) => {
  const isCurrentDay = useMemo(() => {
    const currentDate = new Date();

    if (
      day.dayNumber === currentDate.getUTCDate() &&
      day.monthNumber === currentDate.getUTCMonth() &&
      day.year === currentDate.getUTCFullYear()
    ) {
      return true;
    }

    return false;
  }, [day]);

  return (
    <div
      className={cn(
        "text-[#919191] font-medium h-10 font-poppins flex justify-center relative col-span-1 w-full"
      )}
    >
      <div
        className={cn(
          "py-2 w-full flex justify-center items-center",
          isCurrentDay
            ? "bg-[#C8C0FF] absolute h-[43px] -top-[3px] shadow-[0px_4px_6.7px_0px_rgba(200,191,255,0.34)] rounded-[15px] text-white"
            : ""
        )}
      >
        <span className="text-[17px]">{day.dayName}</span>
      </div>
    </div>
  );
};
WeekDay.propTypes = {
  day: PropTypes.object.isRequired,
};

export default WeekDay;
