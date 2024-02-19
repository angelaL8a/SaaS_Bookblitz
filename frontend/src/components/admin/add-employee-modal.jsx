import PropTypes from "prop-types";
import DatePicker from "../date-picker";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { MinusIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";

const AddEmployeeModal = () => {
  const [birthDate, setBirthDate] = useState(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="button_add_new_user px-4 py-3 mt-5 font-poppins text-[#979797] text-2xl w-[380px]">
          Add new employee
        </button>
      </DialogTrigger>

      <DialogContent
        withCloseButton={false}
        className="max-w-[600px] gap-0 bg-gradient-to-b from-[rgba(255,255,255,0.97)] from-0% via-[rgba(242,236,255,0.97)] via-50% to-[rgba(248,244,255,0.89)] to-100% shadow-[0px_9.923px_16.8px_-3px_rgba(0,0,0,0.10)] py-5 px-10 max-h-[800px] overflow-y-auto"
      >
        <div className="flex justify-between">
          <div></div>

          <DialogClose asChild>
            <Button
              variant="unstyled"
              className="shadow-[0px_4px_4.3px_-3px_rgba(128,37,244,0.67)] rounded-full bg-gradient-to-b from-[#DBCAFF] from-0% to-[#AD98FF] to-100% text-[rgba(255,255,255,0.78)] -mr-5"
            >
              Cancel
            </Button>
          </DialogClose>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-center text-3xl font-poppins">Add employee</h1>

          <div className="mt-4">
            <div className="grid grid-cols-3 gap-5 grid-rows-2">
              <img
                src="https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="row-span-2 w-full h-[140px] object-cover rounded-lg"
              />

              <div className="row-span-2 justify-between flex flex-col">
                <PurpleInput label="First name(s)" placeholder="Romina Ariel" />

                <div>
                  <label className="text-[#747474] text-[15px] font-medium font-poppins">
                    Birth Date
                  </label>

                  <DatePicker
                    date={birthDate}
                    setDate={setBirthDate}
                    label="25/11/2022"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="row-span-2 justify-between flex flex-col">
                <PurpleInput label="Last Name" placeholder="Jacobs Jenkins" />

                <div>
                  <label className="text-[#747474] text-[15px] font-medium font-poppins">
                    Gender
                  </label>

                  <Select>
                    <SelectTrigger
                      className={cn(
                        "w-full h-auto font-normal bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] px-3 py-3 rounded-md text-[rgba(51,51,51,0.41)] border-none text-lg"
                      )}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-5">
              <WhiteInput label="Username" placeholder="rom1987Corp" />

              <WhiteInput label="8-digit Password" placeholder="q@?KC\/Yh7C" />
            </div>

            <Separator className="my-5" />

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-[#747474] text-[15px] font-medium font-poppins">
                  Starting Date
                </label>

                <DatePicker
                  date={birthDate}
                  setDate={setBirthDate}
                  label="25/11/2022"
                  className="w-full"
                />
              </div>

              <WhiteInput label="Position" placeholder="Position" />
            </div>

            <Separator className="my-5" />

            <div className="grid grid-cols-2 gap-5">
              <h2 className="text-[#747474] text-[22px] font-semibold">
                Location
              </h2>

              <div></div>

              <LavandaInput label="City" placeholder="Ville Platte" />

              <LavandaInput label="State" placeholder="Louisiana" />

              <LavandaInput label="Zip" placeholder="70586" variant="bottom" />

              <LavandaInput
                label="Address"
                placeholder="520 Willow Oaks Lane"
                variant="bottom"
              />
            </div>

            <Separator className="my-5" />

            <div className="grid grid-cols-2 gap-5">
              <h2 className="text-[#747474] text-[22px] font-semibold">
                Contact Information
              </h2>

              <div></div>

              <WhiteInput label="Email Address" placeholder="rom19@gmail.com" />

              <WhiteInput label="Telephone" placeholder="(808) 555 - 0111" />
            </div>

            <Separator className="my-5" />

            <div className="grid grid-cols-2 gap-5">
              <h2 className="text-[#747474] text-[22px] font-semibold">
                Payment Information
              </h2>

              <div></div>

              <div>
                <label className="text-[#747474] text-[13px] font-medium font-poppins">
                  Payment Type
                </label>

                <Select>
                  <SelectTrigger
                    className={cn(
                      "w-full h-auto font-normal bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] px-3 py-3 rounded-md text-[rgba(51,51,51,0.41)] border-none text-lg"
                    )}
                  >
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <NumberInput label="Hourly Pay Amount" placeholder="$10" />

              <div></div>

              <div className="w-full flex justify-end items-end">
                <Button
                  variant="unstyled"
                  className="shadow-[0px_4px_4.3px_-3px_rgba(128,37,244,0.67)] rounded-full bg-gradient-to-b from-[#DBCAFF] from-0% to-[#AD98FF] to-100% text-[rgba(255,255,255,0.78)] -mr-5"
                >
                  Add employee
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const PurpleInput = ({ label, placeholder }) => {
  return (
    <div className="rounded-md bg-gradient-to-b from-[rgba(239,229,255,0.50)] from-0% to-[rgba(229,214,255,0.50)] to-100% px-2 py-1.5 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]">
      <label className="text-xs text-[#6D6D6D] block font-poppins">
        {label}
      </label>

      <Input
        placeholder={placeholder}
        className="border-none p-0 shadow-none h-auto text-[#6967A6] placeholder:text-[rgba(174,191,192,0.44)] text-lg"
      />
    </div>
  );
};
PurpleInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

const WhiteInput = ({ label, placeholder }) => {
  return (
    <div>
      <label className="text-[#747474] text-[15px] font-medium font-poppins">
        {label}
      </label>

      <Input
        placeholder={placeholder}
        className="px-3 py-3 h-auto font-poppins bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] rounded-md text-[#6967A6] placeholder:text-[#BCBEC0] text-lg border-none"
      />
    </div>
  );
};
WhiteInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

const LavandaInput = ({ label, placeholder, variant = "top" }) => {
  return (
    <div>
      <label className="text-[#747474] text-[13px] font-medium font-poppins">
        {label}
      </label>

      <Input
        placeholder={placeholder}
        className={cn(
          "px-3 py-3 h-auto font-poppins bg-[rgba(226,222,255,0.58)] text-[#6967A6] placeholder:text-[#BCBEC0] text-lg border border-[rgba(159,63,255,0.18)]",
          variant === "top" ? "rounded-t-lg" : null,
          variant === "bottom" ? "rounded-b-lg" : null
        )}
      />
    </div>
  );
};
LavandaInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  // "top" or "bottom"
  variant: PropTypes.oneOf(["top", "bottom"]),
};

const NumberInput = ({ label, placeholder }) => {
  return (
    <div className="ml-4">
      <label className="text-[#747474] text-[13px] font-medium font-poppins">
        {label}
      </label>

      <div className="px-3 py-2 font-poppins bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] rounded-md text-[#6967A6] placeholder:text-[#BCBEC0] text-lg border-none relative w-[130px]">
        <div className="flex items-center absolute -left-3 top-0 bottom-0">
          <button className="bg-white rounded-full h-8 w-8 flex items-center justify-center">
            <MinusIcon className="h-4 w-4 text-[#ABB5BE]" strokeWidth={4} />
          </button>
        </div>

        <Input
          placeholder={placeholder}
          type="text"
          className="border-none shadow-none w-full placeholder:text-[#D1D1D1]"
        />

        <div className="flex items-center absolute -right-3 top-0 bottom-0">
          <button className="bg-white rounded-full h-8 w-8 flex items-center justify-center">
            <PlusIcon className="h-4 w-4 text-[#ABB5BE]" strokeWidth={4} />
          </button>
        </div>
      </div>
    </div>
  );
};
NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AddEmployeeModal;
