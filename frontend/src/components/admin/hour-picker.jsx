import PropTypes from "prop-types";
import { ClockIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const HOURS = [
  "12",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
];

const MINUTES = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];

const TIME = ["AM", "PM"];

const HourPicker = ({
  label,
  className,
  labelClassName,
  currentHour,
  setCurrentHour,
}) => {
  return (
    <div
      className={cn(
        "rounded-[8px] px-4 py-2 bg-white w-[150px] shadow-[0px_4px_6.1px_0px_rgba(190,190,190,0.34),_-5px_-4px_12.7px_0px_#FFF]",
        className
      )}
    >
      <div className={cn("mb-1 text-sm font-[400]")}>{label}</div>

      <div className="flex items-center justify-between w-full gap-2">
        <div className={cn("font-semibold text-[#2F2F2F]", labelClassName)}>
          {currentHour.hour} : {currentHour.minute} {currentHour.time}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button">
              <ClockIcon className="w-5 h-5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="p-0 h-[250px]">
            <div className="grid w-full h-full grid-cols-3">
              {/* Hour */}
              <div className="flex flex-col max-h-full overflow-x-hidden overflow-y-auto">
                {HOURS.map((h, index) => (
                  <ButtonPicker
                    key={index}
                    name={h}
                    onClick={() => {
                      setCurrentHour({
                        ...currentHour,
                        hour: h,
                      });
                    }}
                    active={h === currentHour.hour}
                  />
                ))}
              </div>

              {/* Minutes */}
              <div className="flex flex-col max-h-full overflow-x-hidden overflow-y-auto">
                {MINUTES.map((m, index) => (
                  <ButtonPicker
                    key={index}
                    name={m}
                    onClick={() => {
                      setCurrentHour({
                        ...currentHour,
                        minute: m,
                      });
                    }}
                    active={m === currentHour.minute}
                  />
                ))}
              </div>

              {/* Time */}
              <div className="flex flex-col max-h-full overflow-x-hidden overflow-y-auto">
                {TIME.map((t, index) => (
                  <ButtonPicker
                    key={index}
                    name={t}
                    onClick={() => {
                      setCurrentHour({
                        ...currentHour,
                        time: t,
                      });
                    }}
                    active={t === currentHour.time}
                  />
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

HourPicker.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  currentHour: PropTypes.object.isRequired,
  setCurrentHour: PropTypes.func.isRequired,
};

const ButtonPicker = ({ name, onClick, className, active }) => {
  return (
    <button
      className={cn(
        "p-2",
        className,
        active ? "bg-[#ca9eff4c] hover:bg-[#ca9eff4c]" : "hover:bg-accent"
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
ButtonPicker.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
};

export default HourPicker;
