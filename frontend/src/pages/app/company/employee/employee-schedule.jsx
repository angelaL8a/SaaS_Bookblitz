import CurrentDate from "@/components/admin/current-date";
import WeekDay from "@/components/admin/week-day";
import Appointment from "@/components/employee/appointment";
import PageContainer from "@/components/page-container";
import SelectedApt from "@/components/selected-apt";
import { useAuth } from "@/hooks/use-auth";
import { useGetCompany } from "@/hooks/use-company";
import { convertTime, extractDateInfo } from "@/lib/utils";
import { useGetDays } from "@/store/schedule-store";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const EmployeeSchedule = () => {
  const { data: user } = useAuth();
  const { daysOfWeek, nextWeek, prevWeek, currentDay } = useGetDays();
  const { data: company } = useGetCompany();

  const [selectedApt, setSelectedApt] = useState(null);

  const shift = company?.shifts?.find((s) => {
    const currentInfo = extractDateInfo(s.date);

    if (
      currentDay &&
      currentInfo.dayName === currentDay.dayName &&
      currentInfo.monthName === currentDay.monthName &&
      currentInfo.dayNumber === currentDay.dayNumber &&
      currentInfo.year === currentDay.year &&
      user?.id === s.employee.user.id
    ) {
      return s;
    }
  });

  return (
    <PageContainer className="mt-8">
      <div className="flex items-start mt-3 gap-14 h-[870px]">
        <div className="w-[70%] flex-1 h-full flex flex-col gap-1">
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

          <div className="flex items-center gap-1 my-4">
            <button onClick={prevWeek} className="duration-150 hover:scale-125">
              <ChevronLeftIcon
                className="w-8 h-8 text-muted-foreground"
                strokeWidth={1.5}
              />
            </button>

            <div className="grid grid-cols-7 rounded-[24px] w-full week_days_card">
              {daysOfWeek.map((day, index) => (
                <WeekDay key={index} day={day} canChange />
              ))}
            </div>

            <button onClick={nextWeek} className="duration-150 hover:scale-125">
              <ChevronRightIcon
                className="w-8 h-8 text-muted-foreground"
                strokeWidth={1.5}
              />
            </button>
          </div>

          <div className="bg-gradient-to-b from-[rgba(246,254,254,0.6)] from-100% via-[rgba(235,235,235,0.29)] via-[32.16%] to-[rgba(255,255,255,0.66)] to-[66%] shadow-[0px_4px_42.2px_-19px_rgba(0,0,0,0.35)] rounded-[24px] px-8 py-5 overflow-auto flex-1">
            {shift ? (
              <>
                <div className="text-[#515151]">
                  {convertTime(shift.checkInTime)} -{" "}
                  {convertTime(shift.checkOutTime)}
                </div>

                <div className="grid grid-cols-3 gap-10 mt-5">
                  {shift.appointments.map((apt) => (
                    <Appointment
                      key={apt.id}
                      apt={apt}
                      setSelectedApt={setSelectedApt}
                    />
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

        <div className="w-[30%] h-full">
          <AnimatePresence>
            {selectedApt ? (
              <SelectedApt
                selectedApt={selectedApt}
                setSelectedApt={setSelectedApt}
                key="apt_modal_anim"
              />
            ) : (
              <></>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageContainer>
  );
};

export default EmployeeSchedule;
