import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { useGetDays } from "@/store/schedule-store";
import { useMemo } from "react";
import { useEffect } from "react";

const WeekDay = ({ day, canChange, activeClassName }) => {
  const { setCurrentDay, currentDay } = useGetDays();

  useEffect(() => {
    setCurrentDay(day);
  }, [day, setCurrentDay]);

  const isCurrentDay = useMemo(() => {
    const currentDate = new Date();

    if (currentDay) {
      if (
        currentDay.dayNumber === day.dayNumber &&
        currentDay.monthNumber === day.monthNumber &&
        currentDay.year === day.year
      ) {
        return true;
      }
    } else {
      if (
        day.dayNumber === currentDate.getUTCDate() &&
        day.monthNumber === currentDate.getUTCMonth() &&
        day.year === currentDate.getUTCFullYear()
      ) {
        return true;
      }
    }

    return false;
  }, [day, currentDay]);

  return (
    <div
      className={cn(
        "text-[#919191] font-medium h-10 font-poppins flex justify-center relative col-span-1 w-full"
      )}
    >
      <div
        onClick={() => {
          if (canChange) setCurrentDay(day);
        }}
        className={cn(
          "py-2 w-full flex justify-center items-center",
          isCurrentDay
            ? cn(
                "bg-[#C8C0FF] absolute h-[43px] -top-[3px] shadow-[0px_4px_6.7px_0px_rgba(200,191,255,0.34)] rounded-[11px] text-white",
                activeClassName
              )
            : null,
          canChange ? "cursor-pointer" : null
        )}
      >
        <span className="text-[17px]">{day.dayName}</span>
      </div>
    </div>
  );
};
WeekDay.propTypes = {
  day: PropTypes.object.isRequired,
  canChange: PropTypes.bool,
  activeClassName: PropTypes.string,
};

export default WeekDay;
