import PropTypes from "prop-types";
import ImagePicker from "../image-picker";
import HourPicker from "./hour-picker";
import NumberInput from "./number-input";
import PaymentType from "./payment-type";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn, convertToJSDate } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useGetCompany } from "@/hooks/use-company";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  getEmptyAppointment,
  useGetScheduleStore,
} from "@/store/schedule-store";
import { XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useHandleCatchError } from "@/hooks/use-handle-catch-error";

const ScheduleBox = ({ user, day }) => {
  const { handleError } = useHandleCatchError();

  const { appointments, addAppointment } = useGetScheduleStore();

  const [checkInTime, setCheckInTime] = useState({
    hour: "hh",
    minute: "mm",
    time: "aa",
  });
  const [checkOutTime, setCheckOutTime] = useState({
    hour: "hh",
    minute: "mm",
    time: "aa",
  });
  const [isPending, setIsPending] = useState(false);

  const createShift = () => {
    try {
      setIsPending(true);

      console.log({
        appointments,
        checkInTime: convertToJSDate(checkInTime),
        checkOutTime: convertToJSDate(checkOutTime),
        date: new Date(),
        employeeId: user.id,
      });
    } catch (error) {
      handleError({ error });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="col-span-1 border-r-2 border-[#F4F4F4] bg-[rgba(251,251,251,0.40)] shadow-[0px_5px_11.8px_-5px_rgba(0,0,0,0.18)] flex items-center justify-center">
          <span className="text-[#0000001f] font-poppins text-center px-6">
            {/* Click in the box to add new shift */}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent
        withCloseButton={false}
        className="max-w-[750px] gap-0 bg-gradient-to-b from-[rgba(255,255,255,0.97)] from-0% via-[rgba(242,236,255,0.97)] via-50% to-[rgba(248,244,255,0.89)] to-100% shadow-[0px_9.923px_16.8px_-3px_rgba(0,0,0,0.10)] py-5 px-10 max-h-[800px] overflow-y-auto font-poppins"
      >
        <h1 className="text-[40px] text-[#8A8888] text-center font-light">
          New Shift
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            createShift();
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

          <div className="flex flex-col mt-8 gap-10">
            <AnimatePresence>
              {appointments.map((appointment, index) => (
                <Appointment key={index} appointment={appointment} />
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center mt-5">
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
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
ScheduleBox.propTypes = {
  user: PropTypes.object.isRequired,
  day: PropTypes.string.isRequired,
};

const Appointment = ({ appointment }) => {
  const { removeAppointment, updateAppointment } = useGetScheduleStore();

  const { data } = useGetCompany();

  const clients = data?.users.filter((u) => u.role === "Client");

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateAppointment({
      ...appointment,
      [name]: value,
    });
  };

  if (!data) return;

  return (
    <motion.div
      initial={{ height: "0", overflow: "hidden" }}
      animate={{ height: "auto", overflow: "visible" }}
      exit={{ height: "0", overflow: "hidden" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="bg-gradient-to-b from-[#EBC0FF] from-0% to-[#FBF3FF] via-[#FFF] via-0% to-100% rounded-[28px] drop-shadow-[0px_4px_8.1px_rgba(176,135,244,0.24)] flex items-start px-6 pb-6 py-12 gap-5">
        <div className="absolute top-2 right-3">
          <button
            type="button"
            className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
            onClick={() => removeAppointment(appointment)}
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col w-[180px] gap-5">
          <ImagePicker
            previewPhoto={appointment.previewPhoto}
            onChange={({ file, url }) => {
              updateAppointment({
                ...appointment,
                currentPhoto: file,
                previewPhoto: url,
              });
            }}
            className="w-full h-[140px]"
          />

          <div>
            <label className="text-[#747474] text-[15px] font-medium font-poppins">
              Select client
            </label>

            <Select
              name="clientId"
              defaultValue={appointment.clientId}
              onValueChange={(value) => {
                updateAppointment({
                  ...appointment,
                  clientId: value,
                });
              }}
            >
              <SelectTrigger
                className={cn(
                  "w-full h-auto font-normal bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] px-3 py-2 rounded-md text-[rgba(51,51,51,0.41)] border-none text-lg"
                )}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent>
                {clients?.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-5">
            <HourPicker
              label="Start"
              className="w-1/2 bg-gradient-to-b from-[rgba(239,229,255,0.50)] from-0% to-[rgba(229,214,255,0.50)] to-100%"
              setCurrentHour={({ hour, minute, time }) => {
                updateAppointment({
                  ...appointment,
                  startTime: { hour, minute, time },
                });
              }}
              currentHour={appointment.startTime}
            />
            <HourPicker
              label="End"
              className="w-1/2 bg-gradient-to-b from-[rgba(239,229,255,0.50)] from-0% to-[rgba(229,214,255,0.50)] to-100%"
              setCurrentHour={({ hour, minute, time }) => {
                updateAppointment({
                  ...appointment,
                  endTime: { hour, minute, time },
                });
              }}
              currentHour={appointment.endTime}
            />
          </div>

          <div className="mt-5">
            <label htmlFor="title" className="text-xs text-[#8B8B8B]">
              Title
            </label>
            <input
              type="text"
              className="border-b p-0 outline-none w-full bg-transparent"
              name="title"
              onChange={handleChange}
              value={appointment.title}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="desc" className="text-xs text-[#8B8B8B]">
              Description
            </label>

            <Textarea
              className="resize-none min-h-[55px]"
              maxLength={100}
              name="description"
              onChange={handleChange}
              value={appointment.description}
            />
          </div>

          <div className="flex justify-between mt-5 gap-5 pr-4">
            <PaymentType className="py-2" />

            <NumberInput
              label="Fee"
              name="fee"
              onChange={(value) => {
                updateAppointment({
                  ...appointment,
                  fee: value,
                });
              }}
              value={appointment.fee}
              placeholder="0.00"
              containerClassName="py-1"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
Appointment.propTypes = {
  appointment: PropTypes.object.isRequired,
};

export default ScheduleBox;
