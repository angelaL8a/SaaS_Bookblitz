import { useGetDays } from "@/store/schedule-store";
import { CalendarIcon } from "lucide-react";
import { useMemo } from "react";

const YearLabel = () => {
  const { daysOfWeek } = useGetDays();

  const currentYear = useMemo(() => {
    if (daysOfWeek[0]?.year === daysOfWeek[daysOfWeek?.length - 1]?.year) {
      return daysOfWeek[0]?.year;
    } else {
      return `${daysOfWeek[0]?.year} - ${
        daysOfWeek[daysOfWeek?.length - 1]?.year
      }`;
    }
  }, [daysOfWeek]);

  return (
    <div className="px-4 py-2 bg-gradient-to-b from-white from-0% via-[rgba(255,255,255,0.00)] via-100% to-[rgba(185,185,185,0.53)] flex items-center gap-2 to-100% rounded-md shadow-[0px_1px_3.3px_0px_rgba(0,0,0,0.25)]">
      <CalendarIcon className="w-5 h-5 text-muted-foreground" />

      <span className="text-[#333]">{currentYear}</span>
    </div>
  );
};

export default YearLabel;
