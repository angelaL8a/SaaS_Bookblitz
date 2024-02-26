import CustomImage from "@/components/custom-image";
import AddEmployeeModal from "@/components/admin/add-employee-modal";
import CurrentDate from "@/components/admin/current-date";
import ScheduleBox from "@/components/admin/schedule-box";
import { useGetCompany } from "@/hooks/use-company";
import { useGetDays } from "@/store/schedule-store";

const AdminSchedule = () => {
  const { data } = useGetCompany();
  const { daysOfWeek } = useGetDays();

  const employees = data?.users.filter((u) => u.role === "Employee");

  return (
    <div className="max-w-[1600px] mx-auto mt-12 px-4">
      <div className="flex items-center gap-8">
        <CurrentDate />

        <div className="flex-1">
          <div className="grid grid-cols-7 rounded-[24px] py-2 w-full week_days_card">
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className="text-[#919191] font-medium font-poppins flex justify-center col-span-1"
              >
                {day.dayName}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-8 mt-5 h-[600px]">
        <div className="w-[380px] flex flex-col gap-4 h-full">
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
        </div>

        <div className="flex-1 h-full">
          <div className="w-full rounded-[11px] overflow-hidden user_company_bg border-2 border-[#F4F4F4]">
            {employees.map((user, index) => (
              <div key={index} className="h-[122px] gap-[0px] grid grid-cols-7">
                {daysOfWeek.map((day, index) => (
                  <ScheduleBox key={index} user={user} day={day} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddEmployeeModal />
    </div>
  );
};

export default AdminSchedule;
