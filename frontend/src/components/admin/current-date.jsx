import YearLabel from "../year-label";
import { useGetDays } from "@/store/schedule-store";

const CurrentDate = () => {
  const { daysOfWeek } = useGetDays();

  // Render the days
  return (
    <div className="w-[380px] flex justify-between items-center">
      <span className="text-[#515151] font-poppins text-[24px]">
        {daysOfWeek[0]?.formattedDay}
        {" - "}
        {daysOfWeek[daysOfWeek?.length - 1]?.formattedDay}
      </span>

      <YearLabel />
    </div>
  );
};

export default CurrentDate;
