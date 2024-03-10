import CurrentDate from "@/components/admin/current-date";
import PageContainer from "@/components/page-container";
import WeekDay from "@/components/admin/week-day";
import Appointment from "@/components/employee/appointment";
import SelectedApt from "@/components/selected-apt";
import { useAuth } from "@/hooks/use-auth";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useGetDays } from "@/store/schedule-store";
import { useGetCompany } from "@/hooks/use-company";
import { extractDateInfo } from "@/lib/utils";

const ClientSchedule = () => {
  const { data: user } = useAuth();
  const { daysOfWeek, nextWeek, prevWeek, currentDay } = useGetDays();
  const { data: company } = useGetCompany();

  const [selectedApt, setSelectedApt] = useState(null);

  const filteredApts = company?.appointments.filter((apt) => {
    const currentInfo = extractDateInfo(apt.date);

    if (
      currentDay &&
      currentInfo.dayName === currentDay.dayName &&
      currentInfo.dayNumber === currentDay.dayNumber &&
      currentInfo.monthName === currentDay.monthName &&
      currentInfo.year === currentDay.year
    ) {
      return apt;
    }
  });

  return (
    <PageContainer className="mt-8">
      <div className="flex items-start mt-3 gap-14">
        <div className="w-[70%] flex-1 flex flex-col gap-1">
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
                <WeekDay
                  key={index}
                  day={day}
                  activeClassName="bg-gradient-to-b from-[#7BF4F4] to-[#9EFFFF]"
                  canChange
                />
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
            {filteredApts.length > 0 ? (
              <div className="grid grid-cols-3 gap-10 mt-5">
                {filteredApts?.map((apt) => (
                  <Appointment
                    key={apt.id}
                    apt={apt}
                    setSelectedApt={setSelectedApt}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-xl max-w-[500px] text-center mx-auto text-[rgba(81,81,81,0.7)]">
                Nothing to see here!
              </div>
            )}
          </div>
        </div>

        <div className="w-[30%] mt-5">
          <AnimatePresence>
            {selectedApt ? (
              <SelectedApt
                key="apt_modal_anim"
                selectedApt={selectedApt}
                setSelectedApt={setSelectedApt}
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

export default ClientSchedule;
