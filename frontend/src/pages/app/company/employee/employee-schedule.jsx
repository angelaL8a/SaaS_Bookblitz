import CurrentDate from "@/components/admin/current-date";
import PageContainer from "@/components/page-container";
import { useAuth } from "@/hooks/use-auth";

const EmployeeSchedule = () => {
  const { data } = useAuth();

  return (
    <PageContainer>
      <h1 className="text-5xl text-[#828282] font-poppins text-center font-[200]">
        Reservations
      </h1>

      <div className="flex items-start gap-5 mt-5">
        <div className="w-[60%] flex-1 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">{data?.name}</h2>

            <CurrentDate
              className="justify-end gap-5 text-base"
              textClassName="text-base"
            />
          </div>

          <div></div>

          <div className="bg-gradient-to-b from-[#F7FFFF] from-100% via-[#F6F6F6] via-[32.16%] to-[#FFFFFF] to-[66%] shadow-[0px_4px_42.2px_-19px_rgba(0,0,0,0.35)] rounded-md p-4 h-[600px]">
            a
          </div>
        </div>

        <div className="w-[40%]">Preview</div>
      </div>
    </PageContainer>
  );
};

export default EmployeeSchedule;
