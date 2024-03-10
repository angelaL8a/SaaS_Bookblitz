import PropTypes from "prop-types";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

const DatePickerWithRange = ({
  className,
  setDays,
  setMonths,
  setYears,
  dateRange,
  numberOfMonths = 2,
}) => {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="flex items-center justify-center">
        <div className="flex items-center text-lg text-muted-foreground">
          <CalendarIcon className="w-5 h-5 mr-1" />

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
        </div>
      </div>

      <div className="w-full">
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
          numberOfMonths={numberOfMonths}
        />
      </div>
    </div>
  );
};
DatePickerWithRange.propTypes = {
  className: PropTypes.string,
  setDays: PropTypes.func.isRequired,
  setMonths: PropTypes.func.isRequired,
  setYears: PropTypes.func.isRequired,
  dateRange: PropTypes.object.isRequired,
  numberOfMonths: PropTypes.number,
};

export default DatePickerWithRange;
