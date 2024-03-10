import PropTypes from "prop-types";
import Rating from "@/components/table/rating";
import CustomImage from "@/components/custom-image";
import DatePickerWithRange from "@/components/date-picker-with-range";
import PageContainer from "@/components/page-container";
import Table from "@/components/table/table";
import TableContent from "@/components/table/table-content";
import { useGetCompany, useGetPayroll } from "@/hooks/use-company";
import { useGetPayrollStore } from "@/store/payroll-store";
import { useState } from "react";
import { cn, getTableDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { motion } from "framer-motion";

const payrollColumns = [
  "Employee name",
  "Hours worked",
  "Additional earnings",
  "Gross pay",
];

const PayrollSummary = () => {
  const { data } = useGetCompany();
  const { dateRange, monthRange, yearRange, setDays, setMonths, setYears } =
    useGetPayrollStore();

  const { payrollData } = useGetPayroll({
    companyId: data.id,
    fromMonth: monthRange?.from?.getUTCMonth(),
    toMonth: monthRange?.to?.getUTCMonth(),
    startDay: dateRange?.from?.getUTCDate(),
    endDay: dateRange?.to?.getUTCDate(),
    fromYear: yearRange?.from?.getUTCFullYear(),
    toYear: yearRange?.to?.getUTCFullYear(),
  });

  const [currentEmployee, setCurrentEmployee] = useState(null);

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

      <div className="flex items-start gap-14 pb-[80px]">
        <div className="max-w-[580px] min-w-[580px] mt-10 h-full flex flex-col gap-8">
          <DatePickerWithRange
            dateRange={dateRange}
            setDays={setDays}
            setMonths={setMonths}
            setYears={setYears}
          />

          {currentEmployee ? (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="w-full bg-[rgba(255,255,255,0.82)] rounded-md py-6 px-8 shadow-[0px_4px_8.9px_0px_rgba(0,0,0,0.13)] border border-[rgba(0,0,0,0.07)]"
            >
              <div className="flex items-center gap-4">
                <CustomImage
                  src={currentEmployee.user.userImageUrl}
                  alt={currentEmployee.user.name}
                  className="rounded-md w-[180px] h-[180px]"
                />

                <div className="flex flex-col items-start justify-start flex-1 gap-2">
                  <EmployeeInfo label="Name of Employee">
                    {currentEmployee.user.name}
                  </EmployeeInfo>

                  <EmployeeInfo label="Address">
                    {currentEmployee.address}, {currentEmployee.city},{" "}
                    {currentEmployee.state}, {currentEmployee.zip}
                  </EmployeeInfo>

                  <div className="flex items-center gap-4">
                    <EmployeeInfo label="Birthday">
                      {getTableDate(currentEmployee.birthDate)}
                    </EmployeeInfo>

                    <EmployeeInfo label="Cell-Phone">
                      {currentEmployee.telephone}
                    </EmployeeInfo>
                  </div>

                  <div className="flex items-center gap-4">
                    <EmployeeInfo label="Gender">
                      {currentEmployee.gender}
                    </EmployeeInfo>

                    <EmployeeInfo label="E-mail Address">
                      {currentEmployee.email}
                    </EmployeeInfo>
                  </div>
                </div>
              </div>

              <Separator className="my-5" />

              <div>
                <div className="text-lg text-center text-muted-foreground">
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        From {format(dateRange.from, "LLL dd, y")} to{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-5 mt-3">
                  <EmployeePayrollDetail label="Avg. Daily Hours">
                    {getHoursAndPayment(currentEmployee.id)?.avgHours}h
                  </EmployeePayrollDetail>

                  <EmployeePayrollDetail label="Total Hours Worked">
                    {getHoursAndPayment(currentEmployee.id)?.hoursWorked}h
                  </EmployeePayrollDetail>
                </div>

                <div className="flex flex-wrap justify-center gap-8 mt-5">
                  <EmployeePayrollDetail label="Pay Type">
                    HOURS
                  </EmployeePayrollDetail>

                  <EmployeePayrollDetail label="Rate">
                    ${getHoursAndPayment(currentEmployee.id)?.paymentPerHour}/hr
                  </EmployeePayrollDetail>

                  <EmployeePayrollDetail
                    label="Total Wage"
                    bgClassName="bg-[rgba(123,244,244,0.54)]"
                  >
                    ${getHoursAndPayment(currentEmployee.id)?.grossPay}/hr
                  </EmployeePayrollDetail>
                </div>

                <div className="flex flex-col items-center justify-center gap-1 mt-5 text-xs">
                  <span className="text-[#8B8B8B]">Average Rating</span>

                  <Rating
                    color={currentEmployee.employeeColor}
                    value={Math.floor(Math.random() * (5 - 1 + 1)) + 1}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex w-full items-center text-2xl  justify-center mt-20 font-poppins text-[#CDCDCD] px-40 h-full text-center">
              Click on the employee image to see more details.
            </div>
          )}
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
                        <button
                          onClick={() => {
                            setCurrentEmployee(employee);
                          }}
                        >
                          <CustomImage
                            src={employee.user.userImageUrl}
                            className="w-10 h-10 rounded-full"
                          />
                        </button>

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

const EmployeePayrollDetail = ({ label, children, bgClassName }) => {
  return (
    <div
      className={cn(
        "px-6 py-2.5 border border-[rgba(0,0,0,0.02)] rounded-md shadow-[0px_4px_13.4px_-8px_rgba(0,0,0,0.13)] flex flex-col items-center",
        bgClassName ??
          "from-[#FFFFFF] from-100% bg-gradient-to-b via-[#F6FCFF] via-[77%] to-[#FAFDFF] to-[88%]"
      )}
    >
      <span className="text-[#8B8B8B]">{label}</span>

      <p>{children}</p>
    </div>
  );
};
EmployeePayrollDetail.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  bgClassName: PropTypes.string,
};

const EmployeeInfo = ({ children, label }) => {
  return (
    <div>
      <span className="text-[#8B8B8B] text-sm">{label}</span>
      <p className="text-[#545454] text-lg font-medium">{children}</p>
    </div>
  );
};
EmployeeInfo.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default PayrollSummary;
