import PropTypes from "prop-types";
import HourPicker from "../hour-picker";
import CustomLoader from "@/components/custom-loader";
import Appointment from "./appointment";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  useGetCompany,
  useMutateCreateShift,
  useMutateUpdateShift,
} from "@/hooks/use-company";
import { useHandleCatchError } from "@/hooks/use-handle-catch-error";
import {
  convertFromDate,
  convertToDateTime,
  convertToJSDate,
  deletePhoto,
  uploadPhoto,
  validCheckTime,
} from "@/lib/utils";
import {
  defaultTime,
  getEmptyAppointment,
  useGetScheduleStore,
} from "@/store/schedule-store";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewShiftModal = ({
  day,
  user,
  defaultShift,
  children,
  dialogOpen,
  setDialogOpen,
}) => {
  const { handleError } = useHandleCatchError();

  const { appointments, addAppointment, resetAppointments, setAppointments } =
    useGetScheduleStore();
  const { data: company, refetch } = useGetCompany();
  const { mutateAsync } = useMutateCreateShift();
  const { mutateAsync: mutateUpdate } = useMutateUpdateShift();

  const [checkInTime, setCheckInTime] = useState(defaultTime);
  const [checkOutTime, setCheckOutTime] = useState(defaultTime);
  const [isPending, setIsPending] = useState(false);

  const timesValid = () => {
    if (!validCheckTime(checkInTime) || !validCheckTime(checkOutTime)) {
      return false;
    }

    return true;
  };

  const validateAppointments = () => {
    let isValid = false;

    appointments.map((apt) => {
      if (
        !apt.description ||
        !apt.title ||
        !validCheckTime(apt.endTime) ||
        !validCheckTime(apt.startTime)
      ) {
        isValid = false;
      } else {
        isValid = true;
      }
    });

    return isValid;
  };

  const createShift = async () => {
    if (!company.id) return;

    let imgIds = [];

    try {
      setIsPending(true);

      const appointmentsWithImg = await Promise.all(
        appointments.map(async (apt) => {
          if (apt.currentPhoto) {
            const fileData = await uploadPhoto(apt.currentPhoto);

            imgIds.push(fileData.public_id);

            return {
              ...apt,
              referencialImageId: fileData.public_id,
              referencialImageUrl: fileData.secure_url,
            };
          } else {
            return apt;
          }
        })
      );

      const dataToSend = {
        shiftDto: {
          checkInTime: convertToJSDate({
            ...checkInTime,
            day: day.dayNumber,
            month: day.monthNumber,
            year: day.year,
          }),
          checkOutTime: convertToJSDate({
            ...checkOutTime,
            day: day.dayNumber,
            month: day.monthNumber,
            year: day.year,
          }),
          date: convertToDateTime(day),
          appointments: appointmentsWithImg.map((apt) => {
            const newApt = { ...apt };

            // delete newApt.id;
            delete newApt.currentPhoto;
            delete newApt.previewPhoto;

            return {
              ...newApt,
              startTime: convertToJSDate({
                ...apt.startTime,
                day: day.dayNumber,
                month: day.monthNumber,
                year: day.year,
              }),
              endTime: convertToJSDate({
                ...apt.endTime,
                day: day.dayNumber,
                month: day.monthNumber,
                year: day.year,
              }),
              fee: parseFloat(newApt.fee),
            };
          }),
          employeeId: user.id,
        },
        companyId: company.id,
      };

      const data = await mutateAsync(dataToSend);

      if (data) {
        refetch();

        setDialogOpen(false);
        setCheckInTime(defaultTime);
        setCheckOutTime(defaultTime);
        resetAppointments();
        return;
      }
    } catch (error) {
      await Promise.all(imgIds.map(async (id) => await deletePhoto(id)));

      handleError({ error });
    } finally {
      setIsPending(false);
    }
  };

  const updateShift = async () => {
    if (!company.id) return;
    if (!defaultShift.id) return;

    let imgIds = [];

    try {
      setIsPending(true);

      const appointmentsWithImg = await Promise.all(
        appointments.map(async (apt) => {
          if (apt.currentPhoto) {
            const fileData = await uploadPhoto(apt.currentPhoto);

            imgIds.push(fileData.public_id);

            return {
              ...apt,
              referencialImageId: fileData.public_id,
              referencialImageUrl: fileData.secure_url,
            };
          } else {
            return apt;
          }
        })
      );

      const shiftDto = {
        checkInTime: convertToJSDate({
          ...checkInTime,
          day: day.dayNumber,
          month: day.monthNumber,
          year: day.year,
        }),
        checkOutTime: convertToJSDate({
          ...checkOutTime,
          day: day.dayNumber,
          month: day.monthNumber,
          year: day.year,
        }),
        appointments: appointmentsWithImg.map((apt) => {
          const newApt = { ...apt };

          // delete newApt.id;
          delete newApt.currentPhoto;
          delete newApt.previewPhoto;
          delete newApt.date;
          delete newApt.status;
          delete newApt.client;

          return {
            ...newApt,
            startTime: convertToJSDate({
              ...apt.startTime,
              day: day.dayNumber,
              month: day.monthNumber,
              year: day.year,
            }),
            endTime: convertToJSDate({
              ...apt.endTime,
              day: day.dayNumber,
              month: day.monthNumber,
              year: day.year,
            }),
            fee: parseFloat(newApt.fee),
          };
        }),
      };

      const data = await mutateUpdate({
        shiftId: defaultShift.id,
        shiftDto: shiftDto,
        companyId: company.id,
      });

      if (data) {
        refetch();

        setDialogOpen(false);
        setCheckInTime(defaultTime);
        setCheckOutTime(defaultTime);
        resetAppointments();
        return;
      }
    } catch (error) {
      await Promise.all(imgIds.map(async (id) => await deletePhoto(id)));

      handleError({ error });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        withCloseButton={false}
        className="max-w-[750px] gap-0 bg-gradient-to-b from-[rgba(255,255,255,0.97)] from-0% via-[rgba(242,236,255,0.97)] via-50% to-[rgba(248,244,255,0.89)] to-100% shadow-[0px_9.923px_16.8px_-3px_rgba(0,0,0,0.10)] py-5 px-10 max-h-[800px] overflow-y-auto font-poppins"
        onCloseAutoFocus={() => {
          resetAppointments();
        }}
        onOpenAutoFocus={() => {
          if (defaultShift) {
            setCheckInTime(convertFromDate(defaultShift.checkInTime));
            setCheckOutTime(convertFromDate(defaultShift.checkOutTime));

            setAppointments(
              defaultShift.appointments.map((apt) => {
                return {
                  ...apt,
                  id: apt.id,
                  currentPhoto: null,
                  previewPhoto: apt.referencialImageUrl,

                  startTime: convertFromDate(apt.startTime),
                  endTime: convertFromDate(apt.endTime),
                  fee: apt.fee.toString(),
                  clientId: apt.client?.id ?? "",
                };
              })
            );
          }
        }}
      >
        <h1 className="text-[40px] text-[#8A8888] text-center font-poppins font-light">
          {defaultShift ? "Edit shift" : "New shift"}
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (defaultShift) {
              updateShift();
            } else {
              createShift();
            }
          }}
        >
          <div className="flex items-center justify-center gap-5 mt-5">
            <HourPicker
              label="Check-in Time"
              className="bg-[#EBE8FF]"
              setCurrentHour={({ hour, minute, time }) => {
                setCheckInTime({ hour, minute, time });
              }}
              currentHour={checkInTime}
            />
            <HourPicker
              label="Check-out Time"
              className="bg-[#EBE8FF]"
              setCurrentHour={({ hour, minute, time }) => {
                setCheckOutTime({ hour, minute, time });
              }}
              currentHour={checkOutTime}
            />
          </div>

          <div className="flex flex-col gap-10 mt-8">
            <AnimatePresence>
              {appointments.map((appointment, index) => (
                <Appointment key={index} appointment={appointment} />
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center mt-5">
            <button
              type="button"
              onClick={() => {
                addAppointment(getEmptyAppointment());
              }}
            >
              <PlusCircleIcon
                className="h-12 w-12 text-[#D6BCF7] drop-shadow-[0px_2px_4.7px_rgba(177,144,248,0.41)]"
                strokeWidth={1}
              />
            </button>
          </div>

          <div className="flex justify-between">
            <div></div>

            <Button
              variant="unstyled"
              className="shadow-[0px_4px_4.3px_-3px_rgba(128,37,244,0.67)] rounded-full bg-gradient-to-b from-[#DBCAFF] from-0% to-[#AD98FF] to-100% text-[rgba(255,255,255,0.78)] -mr-5"
              type="submit"
              disabled={
                !timesValid() ||
                !validateAppointments() ||
                !appointments.length ||
                isPending
              }
            >
              {isPending ? (
                <CustomLoader
                  className="w-5 h-5 mr-2"
                  containerClassName="mt-0"
                />
              ) : null}

              <span>Save</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
NewShiftModal.propTypes = {
  day: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  defaultShift: PropTypes.object,
  children: PropTypes.node,
  dialogOpen: PropTypes.bool,
  setDialogOpen: PropTypes.func,
};

export default NewShiftModal;
