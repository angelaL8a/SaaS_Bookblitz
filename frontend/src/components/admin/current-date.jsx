import { useGetDays } from "@/store/schedule-store";
import { CalendarIcon } from "lucide-react";

const CurrentDate = () => {
  const { daysOfWeek, currentDate } = useGetDays();

  // Render the days
  return (
    <div className="w-[380px] flex justify-between items-center">
      <span className="text-[#515151] font-poppins text-[24px]">
        {daysOfWeek[0]?.formattedDay}
        {" - "}
        {daysOfWeek[daysOfWeek?.length - 1]?.formattedDay}
      </span>

      <div className="px-4 py-2 bg-gradient-to-b from-white from-0% via-[rgba(255,255,255,0.00)] via-100% to-[rgba(185,185,185,0.53)] flex items-center gap-2 to-100% rounded-md shadow-[0px_1px_3.3px_0px_rgba(0,0,0,0.25)]">
        <CalendarIcon className="h-5 w-5 text-muted-foreground" />

        <span className="text-[#333]">{currentDate.getFullYear()}</span>
      </div>
    </div>
  );
};

export default CurrentDate;
