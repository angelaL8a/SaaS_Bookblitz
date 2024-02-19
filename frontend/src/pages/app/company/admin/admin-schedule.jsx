import CustomImage from "@/components/custom-image";
import AddEmployeeModal from "@/components/admin/add-employee-modal";
import { useGetCompany } from "@/hooks/use-company";

const weekDays = [
  {
    id: 1,
    name: "Monday",
  },
  {
    id: 2,
    name: "Tuesday",
  },
  {
    id: 3,
    name: "Wednesday",
  },
  {
    id: 4,
    name: "Thursday",
  },
  {
    id: 5,
    name: "Friday",
  },
  {
    id: 6,
    name: "Saturday",
  },
  {
    id: 7,
    name: "Sunday",
  },
];

const AdminSchedule = () => {
  const { data } = useGetCompany();

  const employees = data?.users.filter((u) => u.role === "Employee");

  return (
    <div className="max-w-[1600px] mx-auto mt-14 px-4">
      <div className="flex items-center gap-8">
        <div className="w-[380px]">a</div>

        <div className="flex-1">
          <div className="grid grid-cols-7 rounded-[24px] py-2 w-full border-b border-[rgba(0,0,0,0.09)] week_days_card">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="text-[#919191] font-medium font-poppins flex justify-center col-span-1"
              >
                {day.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-8 mt-5 h-[600px]">
        <div className="w-[380px] flex flex-col gap-4">
          {employees?.map((user, index) => (
            <div
              key={index}
              className="flex gap-8 h-[112px] items-center px-8 py-4 employee_card_bg rounded-[11px]"
            >
              <CustomImage
                src={user.user.userImageUrl}
                className="h-20 w-20 rounded-full"
              />

              <div className="text-3xl flex-1 truncate font-poppins text-[#6C6C6C]">
                {user.user.name}
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 h-full">
          <div className="w-full rounded-[11px] overflow-hidden user_company_bg">
            {employees.map((user, index) => (
              <div key={index} className="h-[120px] gap-[2px] grid grid-cols-7">
                {Array.from({ length: 7 }).map((_, index) => (
                  <ScheduleBox key={index} />
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

const ScheduleBox = () => {
  return (
    <button className="col-span-1 border-r-2 border-[rgba(225,225,225,0.18)] last-of-type:border-none bg-[rgba(251,251,251,0.40)] shadow-[0px_4px_11.8px_-5px_rgba(0,0,0,0.18)] flex items-center justify-center">
      <span className="text-[#cccccc] font-poppins text-center px-6">
        Click in the box to add new shift
      </span>
    </button>
  );
};

export default AdminSchedule;
