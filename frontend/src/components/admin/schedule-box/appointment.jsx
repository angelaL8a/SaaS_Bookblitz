import PropTypes from "prop-types";
import PaymentType from "../payment-type";
import NumberInput from "../number-input";
import { motion } from "framer-motion";
import { useGetCompany } from "@/hooks/use-company";
import { useGetScheduleStore } from "@/store/schedule-store";
import { XIcon } from "lucide-react";
import ImagePicker from "@/components/image-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HourPicker from "../hour-picker";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
            onClick={() => removeAppointment(appointment)}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col w-[180px] gap-5">
          <ImagePicker
            previewPhoto={appointment.previewPhoto}
            onChange={({
              file,
              url,
              referencialImageUrl,
              referencialImageId,
            }) => {
              updateAppointment({
                ...appointment,
                currentPhoto: file,
                previewPhoto: url,
                referencialImageUrl,
                referencialImageId,
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
              value={appointment.clientId}
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
              className="w-full p-0 bg-transparent border-b outline-none"
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

          <div className="flex justify-between gap-5 pr-4 mt-5">
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

export default Appointment;
