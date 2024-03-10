import CustomImage from "@/components/custom-image";
import DatePickerWithRange from "@/components/date-picker-with-range";
import PageContainer from "@/components/page-container";
import Rating from "@/components/table/rating";
import { useAuth } from "@/hooks/use-auth";
import { useGetCompany, useGetSummary } from "@/hooks/use-company";
import { getTableDate } from "@/lib/utils";
import { useGetSummaryStore } from "@/store/summary-store";
import { UserRoundCheckIcon, UserRoundXIcon } from "lucide-react";

const Summary = () => {
  const { data: user } = useAuth();
  const { data: company } = useGetCompany();
  const { dateRange, monthRange, yearRange, setDays, setMonths, setYears } =
    useGetSummaryStore();

  const { summary } = useGetSummary({
    companyUrl: company?.url,
    fromMonth: monthRange?.from?.getUTCMonth(),
    toMonth: monthRange?.to?.getUTCMonth(),
    startDay: dateRange?.from?.getUTCDate(),
    endDay: dateRange?.to?.getUTCDate(),
    fromYear: yearRange?.from?.getUTCFullYear(),
    toYear: yearRange?.to?.getUTCFullYear(),
  });

  return (
    <PageContainer className="mt-8">
      <div className="flex flex-col">
        <div className="flex items-start gap-8">
          <div className="flex flex-col gap-4 items-center w-[300px] max-w-[300px]">
            <DatePickerWithRange
              dateRange={dateRange}
              setDays={setDays}
              setMonths={setMonths}
              setYears={setYears}
              numberOfMonths={1}
            />

            <div className="flex flex-col items-center bg-gradient-to-b from-[rgba(255,255,255,1)] via-[rgba(246,252,255,0.7728)] to-[rgba(250,253,255,0.88)] rounded-md p-4 w-full">
              <span className="text-[#A7A7A7] text-3xl">Total Hours</span>

              <span className="text-6xl mt-2 font-light text-[#898989]">
                {summary?.hoursAndPayment.hoursWorked}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center flex-1 h-full">
            <h1 className="text-3xl text-[#4F4F4F] font-poppins text-center">
              Hours & Payment Summary
            </h1>

            <div className="mt-8 bg-gradient-to-b from-[rgba(247,255,255,1)] via-[rgba(235,235,235,0.29)] to-[rgba(255,255,255,0.66)] px-5 py-10 rounded-md w-full h-full flex-1">
              <h3 className="text-2xl text-center font-poppins">
                Ratings & Feedback
              </h3>

              <div className="flex flex-col items-center gap-2 mt-8">
                <p className="text-[#888888] text-xl font-light">
                  Average Rating
                </p>

                <Rating
                  value={Math.floor(Math.random() * (5 - 1 + 1)) + 1}
                  color={"#BEBEBE"}
                />
              </div>

              <div className="flex flex-col items-center gap-5 mt-10">
                <div className="bg-[rgba(123,244,244,0.19)] flex items-center gap-8 px-4 py-2 rounded-md w-[400px]">
                  <UserRoundCheckIcon className="w-5 h-5" />

                  <div className="flex flex-col items-start">
                    <span className="text-[#2F2F2F]">High-Rated</span>
                    <span className="text-[#2F2F2F] font-bold text-lg">
                      June 9, 2023
                    </span>
                  </div>

                  <div className="flex flex-col items-start">
                    <p className="text-[#A0A0A0]">Rating</p>
                    <Rating
                      value={Math.floor(Math.random() * (5 - 1 + 1)) + 1}
                      color={"#818181"}
                    />
                  </div>
                </div>

                <div className="bg-[rgba(154,123,244,0.19)] flex items-center gap-8 px-4 py-2 rounded-md w-[400px]">
                  <UserRoundXIcon className="w-5 h-5" />

                  <div className="flex flex-col items-start">
                    <span className="text-[#2F2F2F]">Low-Rated</span>
                    <span className="text-[#2F2F2F] font-bold text-lg">
                      April 20, 2021
                    </span>
                  </div>

                  <div className="flex flex-col items-start">
                    <p className="text-[#A0A0A0]">Rating</p>
                    <Rating
                      value={Math.floor(Math.random() * (5 - 1 + 1)) + 1}
                      color={"#818181"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-[300px] max-w-[300px]">
            <div className="flex flex-col items-center gap-2">
              <CustomImage
                src={user?.userImageUrl}
                alt={user?.name}
                className="w-[180px] h-[180px] aspect-4 rounded-md"
              />

              <p className="text-[#515151] text-2xl truncate">{user?.name}</p>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-b from-[rgba(255,255,255,1)] via-[rgba(246,252,255,0.7728)] to-[rgba(250,253,255,0.88)] rounded-md p-4 w-full">
              <span className="text-[#A7A7A7] text-3xl">Total Payment</span>

              <span className="text-6xl font-light mt-2 text-[#898989]">
                ${summary?.hoursAndPayment.grossPay}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-[#515151] text-2xl font-poppins">
            Breakdown by Week
          </h3>

          <div className="mt-2 overflow-hidden rounded-md">
            <div className="bg-gradient-to-b from-[rgba(233,255,255,1)] via-[rgba(219,249,255,1)] to-[rgba(241,240,255,1)] grid grid-cols-3 p-2">
              <div className="text-center">Date</div>
              <div className="text-center">Total Hours</div>
              <div className="text-center">Payment</div>
            </div>

            <div className="bg-gradient-to-b from-[rgba(255,255,255,1)] via-[rgba(246,252,255,0.77)] to-[rgba(250,253,255,0.88)]">
              {summary?.breakdown.map((record, index) => (
                <div key={index} className="grid w-full grid-cols-3 p-2">
                  <div className="text-center text-[#989898]">
                    {getTableDate(record.shift.date)}
                  </div>
                  <div className="text-center text-[#989898]">
                    {record.totalHours}
                  </div>
                  <div className="text-center text-[#989898]">
                    {record.payment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Summary;
