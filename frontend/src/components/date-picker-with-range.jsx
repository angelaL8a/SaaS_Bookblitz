import PropTypes from "prop-types";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useGetPayrollStore } from "@/store/payroll-store";

const DatePickerWithRange = ({ className }) => {
  const { setDays, setMonths, setYears, dateRange } = useGetPayrollStore();

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-center">
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !dateRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} -{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </div>

      <div className="mt-1">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={(date) => {
            setYears(date);
            setMonths(date);
            setDays(date);
          }}
          numberOfMonths={2}
        />
      </div>
    </div>
  );
};
DatePickerWithRange.propTypes = {
  className: PropTypes.string,
};

export default DatePickerWithRange;
