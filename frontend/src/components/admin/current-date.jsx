import YearLabel from "../year-label";
import PropTypes from "prop-types";
import { useGetDays } from "@/store/schedule-store";
import { cn } from "@/lib/utils";

const CurrentDate = ({ className, textClassName }) => {
  const { daysOfWeek } = useGetDays();

  // Render the days
  return (
    <div
      className={cn("w-[380px] flex justify-between items-center", className)}
    >
      <span
        className={cn("text-[#515151] font-poppins text-[24px]", textClassName)}
      >
        {daysOfWeek[0]?.formattedDay}
        {" - "}
        {daysOfWeek[daysOfWeek?.length - 1]?.formattedDay}
      </span>

      <YearLabel />
    </div>
  );
};
CurrentDate.propTypes = {
  className: PropTypes.string,
  textClassName: PropTypes.string,
};

export default CurrentDate;
