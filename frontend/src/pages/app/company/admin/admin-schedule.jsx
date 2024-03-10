import CustomImage from "@/components/custom-image";
import AddEmployeeModal from "@/components/admin/add-employee-modal";
import CurrentDate from "@/components/admin/current-date";
import ScheduleBox from "@/components/admin/schedule-box";
import WeekDay from "@/components/admin/week-day";
import PageContainer from "@/components/page-container";
import { useGetCompany } from "@/hooks/use-company";
import { useGetDays } from "@/store/schedule-store";
import { ChevronLeftIcon } from "lucide-react";
import { ChevronRightIcon } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
import { useState } from "react";

const AdminSchedule = () => {
  const { data } = useGetCompany();
  const { daysOfWeek, nextWeek, prevWeek } = useGetDays();

  const [employeesFilter, setEmployeesFilter] = useState({
    start: 0,
    end: 4,
  });

  const employees = data?.users
    .filter((u) => u.role === "Employee")
    .slice(employeesFilter.start, employeesFilter.end);

  const isFirstPage = employeesFilter.start - 4 < 0;
  const isLastPage =
    employeesFilter.end <=
    data?.users.filter((u) => u.role === "Employee").length;

  const prevEmployee = () => {
    if (isFirstPage) {
      return;
    }

    setEmployeesFilter({
      start: employeesFilter.start - 4,
      end: employeesFilter.end - 4,
    });
  };

  const nextEmployee = () => {
    setEmployeesFilter({
      start: employeesFilter.start + 4,
      end: employeesFilter.end + 4,
    });
  };

  return (
    <PageContainer>
      <div className="flex items-center gap-8">
        <CurrentDate />

        <div className="flex items-center flex-1 gap-1">
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
      </div>

      <div className="flex items-start gap-8 mt-12 h-[530px]">
        <div className="w-[380px] flex flex-col gap-4 relative">
          {!isFirstPage ? (
            <div className="absolute flex items-center justify-center w-full -top-10">
              <button
                onClick={prevEmployee}
                className="duration-150 hover:scale-125"
              >
                <ChevronUpIcon className="w-8 h-8 text-muted-foreground" />
              </button>
            </div>
          ) : null}

          {employees?.map((user, index) => (
            <div
              key={index}
              className="flex gap-5 items-center px-8 py-[14px] employee_card_bg rounded-[11px]"
            >
              <CustomImage
                src={user.user.userImageUrl}
                className="w-20 h-20 rounded-full"
              />

              <div className="text-3xl flex-1 truncate font-poppins text-[#6C6C6C]">
                {user.user.name}
              </div>
            </div>
          ))}

          {isLastPage ? (
            <div className="absolute flex items-center justify-center w-full -bottom-10">
              <button
                onClick={nextEmployee}
                className="duration-150 hover:scale-125"
              >
                <ChevronDownIcon className="w-8 h-8 text-muted-foreground" />
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex-1 h-full">
          <div className="w-full rounded-[11px] overflow-hidden user_company_bg border-2 border-[#F4F4F4]">
            {employees.length ? (
              <>
                {employees.map((user, index) => (
                  <div
                    key={index}
                    className="h-[122px] gap-[0px] grid grid-cols-7"
                  >
                    {daysOfWeek.map((day, index) => (
                      <ScheduleBox key={index} user={user} day={day} />
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center p-5">
                <h3>Add a new employee to see their shifts!</h3>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddEmployeeModal />
    </PageContainer>
  );
};

export default AdminSchedule;
