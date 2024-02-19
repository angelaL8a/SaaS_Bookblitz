import PropTypes from "prop-types";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";

const DatePicker = ({ date, setDate, label, className }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="unstyled"
          className={cn(
            "w-[130px] justify-start text-left h-auto font-normal bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] px-3 py-3 rounded-md text-[rgba(51,51,51,0.41)]",
            className
          )}
        >
          <CalendarIcon className="w-5 h-5 mr-2" />

          <div className="flex-1 truncate text-lg">
            {date ? format(date, "PP") : label ?? "Pick a date"}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
DatePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default DatePicker;
