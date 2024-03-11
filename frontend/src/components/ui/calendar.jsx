/* eslint-disable react/prop-types */
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { useNavigation } from "react-day-picker";
import { format, subYears } from "date-fns";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";

function Calendar({
  className,
  classNames,
  onSelect,
  selected,
  showOutsideDays = true,
  ...props
}) {
  const [selectedYear, setSelectedYear] = useState(2024);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-full", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 justify-between w-full sm:space-y-0",
        month:
          "space-y-4 py-2 px-4 border border-[rgba(0,0,0,0.01)] bg-[rgba(123,244,244,0.23)] rounded-md shadow-[0px_4px_9.7px_0px_rgba(0,0,0,0.04)]",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "font-medium text-[#666] text-lg",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-separate p-1 space-y-1 bg-white rounded-sm",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          // eslint-disable-next-line react/prop-types
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn("h-8 w-8 p-0 font-normal rounded-sm aria-selected:opacity-100"),
        day_range_start: "day-range-start rounded-tl-md rounded-bl-md",
        day_range_end: "day-range-end rounded-tr-md rounded-br-md",
        day_selected:
          "bg-[#A3A3A3] text-primary-foreground hover:text-primary-foreground",
        day_today: "bg-[#e2e8f0] text-accent-foreground rounded-md",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="w-4 h-4" />,
        IconRight: () => <ChevronRightIcon className="w-4 h-4" />,
        CaptionLabel: ({ displayMonth }) => (
          <Caption
            onSelect={onSelect}
            displayMonth={displayMonth}
            setSelectedYear={setSelectedYear}
            selectedYear={selectedYear}
          />
        ),
      }}
      onSelect={onSelect}
      selected={selected}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

const Caption = ({ onSelect, displayMonth, selectedYear, setSelectedYear }) => {
  const currentYear = new Date().getFullYear();
  const startYear = 1900;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const [yearFilter, setYearFilter] = useState({
    start: 116,
    end: 125,
  });

  const { goToDate } = useNavigation();

  const isFirstPage = yearFilter.start - 4 < 0;
  const isLastPage = yearFilter.end >= years.length;

  const handleYearClick = (year) => {
    setSelectedYear(year);

    const newDate = subYears(new Date(), new Date().getUTCFullYear() - year);
    onSelect(newDate);
    goToDate(newDate);
  };

  const handlePrevYear = () => {
    if (isFirstPage) {
      return;
    }

    setYearFilter({
      start: yearFilter.start - 4,
      end: yearFilter.end - 4,
    });
  };

  const handleNextYear = () => {
    setYearFilter({
      start: yearFilter.start + 4,
      end: yearFilter.end + 4,
    });
  };

  const visibleYears = years.slice(yearFilter.start, yearFilter.end);

  console.log(selectedYear);

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <div className="p-2 text-center cursor-pointer hover:opacity-60">
          {format(displayMonth, "MMM yyy")}
        </div>
      </DialogTrigger>

      <DialogContent className="gap-0 p-0">
        <div className="flex">
          <button
            onClick={handlePrevYear}
            disabled={isFirstPage}
            className="flex items-center justify-center w-1/2 p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <button
            onClick={handleNextYear}
            disabled={isLastPage}
            className="flex items-center justify-center w-1/2 p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3">
          {visibleYears.map((year) => (
            <button
              key={year}
              onClick={() => handleYearClick(year)}
              className={cn(
                "p-2",
                selectedYear === year
                  ? "bg-blue-300 text-white"
                  : "hover:bg-gray-100"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { Calendar };
