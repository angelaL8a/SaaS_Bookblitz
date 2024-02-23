import PropTypes from "prop-types";
import DatePicker from "../date-picker";
import CustomLoader from "../custom-loader";
import ImagePicker from "../image-picker";
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
import { useGetCompany, useMutateAddemployee } from "@/hooks/use-company";
import { useToast } from "../ui/use-toast";
import { axiosClient } from "@/lib/axios";
import { useHandleCatchError } from "@/hooks/use-handle-catch-error";
import NumberInput from "./number-input";
import PaymentType from "./payment-type";

const AddEmployeeModal = () => {
  const { toast } = useToast();
  const { handleError } = useHandleCatchError();

  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    birthDate: null,
    gender: "",
    startingDate: null,
    position: "",
    city: "",
    state: "",
    zip: "",
    address: "",
    email: "",
    telephone: "",
    paymentPerHour: "0",
  });
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const [isPending, setIsPending] = useState(false);

  const { data, refetch } = useGetCompany();
  const { mutateAsync } = useMutateAddemployee();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addEmployee = async () => {
    if (!data) return;

    let userSecureUrl;
    let userPublicId;

    try {
      setIsPending(true);
      if (currentPhoto) {
        const formDataToSend = new FormData();
        formDataToSend.append("file", currentPhoto);

        const { data: fileData } = await axiosClient.post(
          "/files/upload",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        userSecureUrl = fileData.secure_url;
        userPublicId = fileData.public_id;
      }

      const newEmployeeData = await mutateAsync({
        companyId: data.id,
        employeeDto: {
          ...employeeData,
          paymentPerHour: parseFloat(employeeData.paymentPerHour),
          userImageUrl: userSecureUrl,
          userImageId: userPublicId,
        },
      });

      if (newEmployeeData) {
        refetch();

        setEmployeeData({
          firstName: "",
          lastName: "",
          birthDate: null,
          gender: "",
          startingDate: null,
          position: "",
          city: "",
          state: "",
          zip: "",
          address: "",
          email: "",
          telephone: "",
          paymentPerHour: "0",
        });
        setCurrentPhoto(null);
        setPreviewPhoto(null);

        toast({
          title: "Employee Added",
          description: "Employee added successfully.",
        });
      }
    } catch (error) {
      if (userPublicId) {
        await axiosClient.delete(`/files/remove?public_id=${userPublicId}`);
      }

      handleError({ error });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-[380px] flex justify-center mt-5">
          <button className="button_add_new_user px-4 py-3 font-poppins text-[#979797] text-2xl w-[360px]">
            Add new employee
          </button>
        </div>
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

        <form
          onSubmit={(e) => {
            e.preventDefault();

            addEmployee();
          }}
        >
          <h1 className="text-center text-3xl font-poppins">Add employee</h1>

          <div className="mt-8">
            <GridContainer className="grid-cols-3 grid-rows-2">
              <ImagePicker
                previewPhoto={previewPhoto}
                onChange={({ file, url }) => {
                  setCurrentPhoto(file);
                  setPreviewPhoto(url);
                }}
              />

              <div className="row-span-2 justify-between flex flex-col">
                <PurpleInput
                  label="First name(s)"
                  placeholder="Romina Ariel"
                  name="firstName"
                  onChange={handleChange}
                  value={employeeData.firstName}
                />

                <div>
                  <label className="text-[#747474] text-[15px] font-medium font-poppins">
                    Birth Date
                  </label>

                  <DatePicker
                    date={employeeData.birthDate}
                    setDate={(date) => {
                      setEmployeeData({
                        ...employeeData,
                        birthDate: date,
                      });
                    }}
                    label="25/11/2022"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="row-span-2 justify-between flex flex-col">
                <PurpleInput
                  label="Last Name"
                  placeholder="Jacobs Jenkins"
                  name="lastName"
                  onChange={handleChange}
                  value={employeeData.lastName}
                />

                <div>
                  <label className="text-[#747474] text-[15px] font-medium font-poppins">
                    Gender
                  </label>

                  <Select
                    onValueChange={(value) => {
                      setEmployeeData({
                        ...employeeData,
                        gender: value,
                      });
                    }}
                    defaultValue={employeeData.gender}
                    name="gender"
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full h-auto font-normal bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] px-3 py-3 rounded-md text-[rgba(51,51,51,0.41)] border-none text-lg"
                      )}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </GridContainer>

            <GridContainer className="mt-5">
              <WhiteInput
                label="Username"
                placeholder="rom1987Corp"
                disabled
                autocompleted
              />

              <WhiteInput
                label="8-digit Password"
                placeholder="q@?KC\/Yh7C"
                disabled
                autocompleted
              />
            </GridContainer>

            <Separator className="my-5" />

            <GridContainer>
              <div>
                <label className="text-[#747474] text-[15px] font-medium font-poppins">
                  Starting Date
                </label>

                <DatePicker
                  date={employeeData.startingDate}
                  setDate={(date) => {
                    setEmployeeData({
                      ...employeeData,
                      startingDate: date,
                    });
                  }}
                  label="25/11/2022"
                  className="w-full"
                />
              </div>

              <WhiteInput
                label="Position"
                placeholder="Position"
                name="position"
                onChange={handleChange}
                value={employeeData.position}
              />
            </GridContainer>

            <Separator className="my-5" />

            <GridContainer className="gap-y-2">
              <h2 className="text-[#747474] text-[22px] font-semibold">
                Location
              </h2>

              <div></div>

              <LavandaInput
                label="City"
                placeholder="Ville Platte"
                name="city"
                onChange={handleChange}
                value={employeeData.city}
              />

              <LavandaInput
                label="State"
                placeholder="Louisiana"
                name="state"
                onChange={handleChange}
                value={employeeData.state}
              />

              <LavandaInput
                label="Zip"
                placeholder="70586"
                variant="bottom"
                name="zip"
                onChange={handleChange}
                value={employeeData.zip}
              />

              <LavandaInput
                label="Address"
                placeholder="520 Willow Oaks Lane"
                variant="bottom"
                name="address"
                onChange={handleChange}
                value={employeeData.address}
              />
            </GridContainer>

            <Separator className="my-5" />

            <GridContainer className="gap-y-2">
              <h2 className="text-[#747474] text-[22px] font-semibold">
                Contact Information
              </h2>

              <div></div>

              <WhiteInput
                label="Email Address"
                placeholder="rom19@gmail.com"
                name="email"
                onChange={handleChange}
                value={employeeData.email}
              />

              <WhiteInput
                label="Telephone"
                placeholder="(808) 555 - 0111"
                name="telephone"
                onChange={handleChange}
                value={employeeData.telephone}
              />
            </GridContainer>

            <Separator className="my-5" />

            <GridContainer className="gap-y-2">
              <h2 className="text-[#747474] text-[22px] font-semibold">
                Payment Information
              </h2>

              <div></div>

              <PaymentType />

              <NumberInput
                label="Hourly Pay Amount"
                placeholder="10"
                name="paymentPerHour"
                onChange={(value) => {
                  setEmployeeData({
                    ...employeeData,
                    paymentPerHour: value,
                  });
                }}
                value={employeeData.paymentPerHour}
              />

              <div></div>

              <div className="w-full flex justify-end items-end">
                <Button
                  variant="unstyled"
                  className="shadow-[0px_4px_4.3px_-3px_rgba(128,37,244,0.67)] rounded-full bg-gradient-to-b from-[#DBCAFF] from-0% to-[#AD98FF] to-100% text-[rgba(255,255,255,0.78)] -mr-5"
                  type="submit"
                  disabled={
                    isPending ||
                    !employeeData.firstName ||
                    !employeeData.lastName ||
                    !employeeData.birthDate ||
                    !employeeData.gender ||
                    !employeeData.startingDate ||
                    !employeeData.position ||
                    !employeeData.city ||
                    !employeeData.state ||
                    !employeeData.zip ||
                    !employeeData.address ||
                    !employeeData.email ||
                    !employeeData.telephone ||
                    !employeeData.paymentPerHour
                  }
                >
                  {isPending ? (
                    <CustomLoader
                      containerClassName="mr-2 mt-0"
                      className="h-5 w-5"
                    />
                  ) : null}
                  Add employee
                </Button>
              </div>
            </GridContainer>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const GridContainer = ({ children, className }) => {
  return (
    <div className={cn("grid grid-cols-2 gap-5", className)}>{children}</div>
  );
};
GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const PurpleInput = ({ label, placeholder, name, value, onChange }) => {
  return (
    <div className="rounded-md bg-gradient-to-b from-[rgba(239,229,255,0.50)] from-0% to-[rgba(229,214,255,0.50)] to-100% px-2 py-1.5 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]">
      <label className="text-xs text-[#6D6D6D] block font-poppins">
        {label}
      </label>

      <Input
        placeholder={placeholder}
        className="border-none p-0 shadow-none h-auto text-[#6967A6] placeholder:text-[rgba(174,191,192,0.44)] text-lg"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
PurpleInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const WhiteInput = ({
  label,
  placeholder,
  disabled,
  autocompleted,
  value,
  onChange,
  name,
}) => {
  return (
    <div>
      <label className="text-[#747474] text-[15px] font-medium font-poppins">
        {label}
      </label>

      <Input
        placeholder={placeholder}
        className="px-3 py-3 h-auto font-poppins bg-white shadow-[0px_4px_3.3px_0px_rgba(0,0,0,0.03)] rounded-md text-[#6967A6] placeholder:text-[#BCBEC0] text-lg border-none"
        disabled={disabled}
        value={value}
        onChange={onChange}
        name={name}
      />

      {autocompleted ? (
        <span className="text-[11px] pl-1 text-muted-foreground/50">
          This field will be autocompleted by default.
        </span>
      ) : null}
    </div>
  );
};
WhiteInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  autocompleted: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const LavandaInput = ({
  label,
  placeholder,
  variant = "top",
  value,
  onChange,
  name,
}) => {
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
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};
LavandaInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["top", "bottom"]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AddEmployeeModal;
