import PropTypes from "prop-types";
import CustomImage from "@/components/custom-image";
import NewShiftModal from "./new-shift-modal";
import { useGetCompany } from "@/hooks/use-company";
import {
  cn,
  convertTime,
  extractDateInfo,
  gradientPastelColors,
} from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { shuffle } from "lodash";
import { TrashIcon } from "lucide-react";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

const ScheduleBox = ({ user, day }) => {
  const { data: company } = useGetCompany();

  const shift = company?.shifts.find((s) => {
    const currentInfo = extractDateInfo(s.date);

    if (
      currentInfo.dayName === day.dayName &&
      currentInfo.monthName === day.monthName &&
      currentInfo.dayNumber === day.dayNumber &&
      currentInfo.year === day.year &&
      user.id === s.employee.id
    ) {
      return s;
    }
  });

  const [createModal, setCreateModal] = useState(false);

  return (
    <div className="col-span-1 border-r-2 border-[#F4F4F4] bg-[rgba(251,251,251,0.40)] shadow-[0px_5px_11.8px_-5px_rgba(0,0,0,0.18)] flex items-center justify-center">
      {shift ? (
        <Shift user={user} shift={shift} day={day} />
      ) : (
        <NewShiftModal
          day={day}
          user={user}
          dialogOpen={createModal}
          setDialogOpen={setCreateModal}
        >
          <button className="flex justify-center">
            <span className="text-[#0000001f] font-poppins text-center px-6">
              Click in the box to add new shift
            </span>
          </button>
        </NewShiftModal>
      )}
    </div>
  );
};
ScheduleBox.propTypes = {
  user: PropTypes.object.isRequired,
  day: PropTypes.object.isRequired,
};

const Shift = ({ shift, user, day }) => {
  const dateInfo = extractDateInfo(shift.date);

  const [editModal, setEditModal] = useState(false);

  return (
    <>
      <ContextMenu>
        <Dialog>
          <ContextMenuTrigger asChild>
            <DialogTrigger>
              <div className="flex flex-col items-center justify-center gap-2">
                <div
                  style={{
                    backgroundColor: user?.employeeColor,
                  }}
                  className="px-3 py-3 rounded-md font-poppins font-semibold shadow-[0px_4px_5.8px_0px_rgba(0,0,0,0.06)]"
                >
                  {convertTime(shift.checkInTime)} -{" "}
                  {convertTime(shift.checkOutTime)}
                </div>

                <span>Appointments</span>
              </div>
            </DialogTrigger>
          </ContextMenuTrigger>

          <DialogContent
            withCloseButton={false}
            className="max-w-[760px] gap-0 bg-gradient-to-b from-[rgba(255,255,255,0.97)] from-0% via-[rgba(242,236,255,0.97)] via-50% to-[rgba(248,244,255,0.89)] to-100% shadow-[0px_9.923px_16.8px_-3px_rgba(0,0,0,0.10)] py-5 pb-14 px-16 max-h-[800px] overflow-y-auto font-poppins"
          >
            <h1 className="text-[40px] text-[#8A8888] text-center font-poppins font-light">
              Appointments
            </h1>

            <div className="flex flex-col gap-8 mt-5">
              {shift.appointments.map((apt, index) => {
                const startTimeInfo = convertTime(apt.startTime);
                const endTimeInfo = convertTime(apt.endTime);

                return (
                  <div
                    key={index}
                    className="bg-gradient-to-b from-[#EBC0FF] from-0% to-[#FBF3FF] via-[#FFF] via-0% to-100% rounded-[28px] drop-shadow-[0px_4px_8.1px_rgba(176,135,244,0.24)] flex items-start py-6 px-8 gap-5 border border-[rgba(0,0,0,0.01)]"
                  >
                    {/* <div className="w-[180px] bg-blue-500 h-[120px] rounded-lg"></div> */}
                    <CustomImage
                      src={apt.referencialImageUrl}
                      className={`w-[186px] h-[120px] rounded-lg relative ${shuffle(
                        gradientPastelColors
                      ).pop()}`}
                    >
                      <button className="absolute bottom-2 left-2 z-50 bg-[#FCF6FF] shadow-[4px_4px_15px_0px_#C3C3C3,_-6px_-4px_15px_0px_#FFF] rounded-full px-3 py-2 font-poppins text-[#8B8B8B] text-xs">
                        Feedbacks
                      </button>
                    </CustomImage>

                    <div className="flex flex-col flex-1 w-full">
                      <div className="flex items-center justify-center gap-5">
                        <AppointmentDetail
                          label="Date"
                          className="h-14 flex items-center justify-center flex-col text-[#909090]"
                        >
                          <span className="text-2xl">{dateInfo.dayNumber}</span>
                          <span className="-mt-2">{dateInfo.monthName}</span>
                        </AppointmentDetail>

                        <AppointmentDetail
                          label="Hour"
                          className="text-[#909090] h-14 flex items-center justify-center"
                        >
                          {startTimeInfo} - {endTimeInfo}
                        </AppointmentDetail>

                        <AppointmentDetail
                          label="Fee"
                          className="bg-[#F8F5FF] text-[#909090] h-14 flex flex-col items-center justify-center"
                        >
                          <span className="text-2xl">${apt.fee}</span>
                          <span className="-mt-1 text-xs">USD</span>
                        </AppointmentDetail>
                      </div>

                      <div className="flex items-center gap-5 px-2 mt-4">
                        {apt.client ? (
                          <div className="flex items-center gap-2">
                            <CustomImage
                              src={apt.client?.user?.userImageUrl}
                              className="w-8 h-8"
                            />

                            <div className="flex flex-col items-start flex-1 font-poppins">
                              <span className="text-[#8B8B8B] text-[10px]">
                                Client
                              </span>

                              <span className="text-[#515151] -mt-1.5 truncate">
                                {apt.client?.user.firstName}{" "}
                                {apt.client?.user.lastName.charAt(0)}.
                              </span>
                            </div>
                          </div>
                        ) : null}

                        <div className="flex flex-col items-start font-poppins">
                          <span className="text-[#8B8B8B] text-[10px]">
                            Title
                          </span>

                          <p className="truncate -mt-1.5 text-[#808080]">
                            {apt.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>

        <ContextMenuContent className="w-[140px]">
          <ContextMenuItem onClick={() => setEditModal(true)}>
            <PencilIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            Edit shift
          </ContextMenuItem>

          <ContextMenuSeparator />

          <ContextMenuItem className="text-red-400">
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete shift
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <NewShiftModal
        day={day}
        user={user}
        dialogOpen={editModal}
        setDialogOpen={setEditModal}
        defaultShift={shift}
      />
    </>
  );
};
Shift.propTypes = {
  shift: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  day: PropTypes.object.isRequired,
};

const AppointmentDetail = ({ label, children, className }) => {
  return (
    <div className="flex flex-col items-start font-poppins">
      <span className="text-[#9B9B9B] text-sm">{label}</span>

      <div
        className={cn(
          "rounded-md px-4 py-1 shadow-[0px_2px_2.6px_0px_rgba(0,0,0,0.13)] bg-[#FCFCFC]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
AppointmentDetail.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ScheduleBox;
