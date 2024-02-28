import CustomImage from "@/components/custom-image";
import DatePickerWithRange from "@/components/date-picker-with-range";
import PageContainer from "@/components/page-container";
import Table from "@/components/table/table";
import TableContent from "@/components/table/table-content";
import { useGetCompany, useGetPayroll } from "@/hooks/use-company";
import { useGetPayrollStore } from "@/store/payroll-store";

const payrollColumns = [
  "Employee name",
  "Hours worked",
  "Additional earnings",
  "Gross pay",
];

const PayrollSummary = () => {
  const { data } = useGetCompany();
  const { dateRange, monthRange, yearRange } = useGetPayrollStore();

  const { payrollData } = useGetPayroll({
    companyId: data.id,
    fromMonth: monthRange?.from?.getUTCMonth(),
    toMonth: monthRange?.to?.getUTCMonth(),
    startDay: dateRange?.from?.getUTCDate(),
    endDay: dateRange?.to?.getUTCDate(),
    fromYear: yearRange?.from?.getUTCFullYear(),
    toYear: yearRange?.to?.getUTCFullYear(),
  });

  const employees = data?.users.filter((u) => u.role === "Employee");

  const getHoursAndPayment = (employeeId) => {
    const item = payrollData?.find((item) => item.employee.id === employeeId);
    if (item) {
      return item.hoursAndPayment;
    }
  };

  return (
    <PageContainer>
      <h1 className="text-5xl text-[#828282] font-poppins text-center font-[200]">
        Payroll & Employee Performance Overview
      </h1>

      <div className="flex items-start gap-14">
        <div className="w-[500px] mt-10">
          <div className="flex items-center justify-center gap-5">
            <DatePickerWithRange />
          </div>
        </div>

        <div className="flex-1">
          <Table
            columns={payrollColumns}
            headerClassName="[background:linear-gradient(180deg,#D3FFFC_0%,#A0FFFF_100%)]"
          >
            {employees.map((employee, index) => (
              <TableContent
                key={index}
                columns={payrollColumns}
                columnsData={[
                  {
                    name: "Employee name",
                    element: (
                      <div className="flex items-center gap-2">
                        <CustomImage
                          src={employee.user.userImageUrl}
                          className="w-10 h-10 rounded-full"
                        />

                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[#25213B] text-lg font-medium truncate">
                            {employee.user.name}
                          </span>
                          <span className="text-[#6E6893] -mt-1.5 text-sm truncate">
                            ${employee.paymentPerHour}/hour
                          </span>
                        </div>
                      </div>
                    ),
                  },
                  {
                    name: "Hours worked",
                    element: (
                      <div className="flex items-center justify-center text-[#ACACAC] text-lg">
                        <span>
                          {getHoursAndPayment(employee.id)?.hoursWorked}H
                        </span>
                      </div>
                    ),
                  },
                  {
                    name: "Additional earnings",
                    element: <div></div>,
                  },
                  {
                    name: "Gross pay",
                    element: (
                      <div className="flex items-center justify-center text-[#ACACAC] text-lg">
                        <span>
                          ${getHoursAndPayment(employee.id)?.grossPay}
                        </span>
                      </div>
                    ),
                  },
                ]}
              />
            ))}
          </Table>
        </div>
      </div>
    </PageContainer>
  );
};

export default PayrollSummary;
