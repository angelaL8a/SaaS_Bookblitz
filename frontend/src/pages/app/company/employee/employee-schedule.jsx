import CurrentDate from "@/components/admin/current-date";
import WeekDay from "@/components/admin/week-day";
import CustomImage from "@/components/custom-image";
import PageContainer from "@/components/page-container";
import { useAuth } from "@/hooks/use-auth";
import { useGetCompany } from "@/hooks/use-company";
import {
  cn,
  convertTime,
  extractDateInfo,
  gradientPastelColors,
} from "@/lib/utils";
import { useGetDays } from "@/store/schedule-store";
import { shuffle } from "lodash";
import { ChevronRightIcon } from "lucide-react";
import { ChevronLeftIcon } from "lucide-react";

const EmployeeSchedule = () => {
  const { data: user } = useAuth();
  const { daysOfWeek, nextWeek, prevWeek, currentDay } = useGetDays();
  const { data: company } = useGetCompany();

  const shift = company?.shifts.find((s) => {
    const currentInfo = extractDateInfo(s.date);

    if (
      currentDay &&
      currentInfo.dayName === currentDay.dayName &&
      currentInfo.monthName === currentDay.monthName &&
      currentInfo.dayNumber === currentDay.dayNumber &&
      currentInfo.year === currentDay.year &&
      user.id === s.employee.user.id
    ) {
      return s;
    }
  });

  const dateInfo = extractDateInfo(shift?.date);

  const bgColor = shuffle(gradientPastelColors()).pop();

  return (
    <PageContainer className="mt-8">
      <div className="flex items-start gap-5 mt-3">
        <div className="w-[60%] flex-1 flex flex-col gap-1">
          <h1 className="text-4xl text-[#828282] font-poppins text-center">
            Reservations
          </h1>

          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-[#515151]">{user?.name}</h2>

            <CurrentDate
              className="justify-end gap-5 text-base"
              textClassName="text-base"
            />
          </div>

          <div className="flex items-center flex-1 gap-1 my-4">
            <button onClick={prevWeek} className="duration-150 hover:scale-125">
              <ChevronLeftIcon
                className="w-8 h-8 text-muted-foreground"
                strokeWidth={1.5}
              />
            </button>

            <div className="grid grid-cols-7 rounded-[24px] w-full week_days_card">
              {daysOfWeek.map((day, index) => (
                <WeekDay key={index} day={day} />
              ))}
            </div>

            <button onClick={nextWeek} className="duration-150 hover:scale-125">
              <ChevronRightIcon
                className="w-8 h-8 text-muted-foreground"
                strokeWidth={1.5}
              />
            </button>
          </div>

          <div className="bg-gradient-to-b from-[rgba(246,254,254,0.6)] from-100% via-[rgba(235,235,235,0.29)] via-[32.16%] to-[rgba(255,255,255,0.66)] to-[66%] shadow-[0px_4px_42.2px_-19px_rgba(0,0,0,0.35)] rounded-[24px] px-8 py-5 h-[600px] overflow-auto">
            {shift ? (
              <>
                <div className="text-[#515151]">
                  {convertTime(shift.checkInTime)} -{" "}
                  {convertTime(shift.checkOutTime)}
                </div>

                <div className="grid grid-cols-3 gap-10 mt-5">
                  {shift.appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="overflow-hidden rounded-lg shadow-[0px_9.92px_39.69px_-18px_rgba(0,0,0,0.25)]"
                    >
                      <CustomImage
                        src={apt.referencialImageUrl}
                        className={`aspect-w-14 aspect-h-7 relative w-full h-[90px] ${bgColor.color}`}
                      />

                      <div className="relative flex flex-col gap-2 p-4 bg-white">
                        <div className="absolute flex flex-col items-start -mt-12 font-poppins">
                          <div
                            className={cn(
                              "rounded-md px-4 py-1 shadow-[0px_2px_2.6px_0px_rgba(0,0,0,0.13)] bg-[#FCFCFC]",
                              "h-14 flex items-center justify-center flex-col"
                            )}
                          >
                            <span
                              className={`text-2xl ${bgColor.textColor} text-transparent`}
                            >
                              {dateInfo.dayNumber}
                            </span>

                            <span
                              className={`-mt-2 ${bgColor.textColor} text-transparent`}
                            >
                              {dateInfo.monthName}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-[#2B2B2B] text-lg mt-6 leading-3">
                          {apt.title}
                        </h3>

                        <div className="text-[#515151]">
                          {convertTime(apt.startTime)} -{" "}
                          {convertTime(apt.endTime)}
                        </div>

                        <div className="flex items-center gap-3">
                          <CustomImage
                            src={apt.client.user.userImageUrl}
                            alt={apt.client.user.name}
                            className="rounded-full w-7 h-7"
                          />

                          <span className="text-[#515151] -mt-1.5 truncate">
                            {apt.client?.user.firstName}{" "}
                            {apt.client?.user.lastName.charAt(0)}.
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-xl max-w-[500px] text-center mx-auto text-[rgba(81,81,81,0.7)]">
                Nothing to see here! You&apos;ve completed all your shifts like
                a champ. Time to kick back and relax! 😎
              </div>
            )}
          </div>
        </div>

        <div className="w-[40%]"></div>
      </div>
    </PageContainer>
  );
};

export default EmployeeSchedule;
