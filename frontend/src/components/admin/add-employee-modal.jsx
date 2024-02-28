import DatePicker from "../date-picker";
import CustomLoader from "../custom-loader";
import ImagePicker from "../image-picker";
import NumberInput from "./number-input";
import PaymentType from "./payment-type";
import GridContainer from "./form/grid-container";
import PurpleInput from "./form/purple-input";
import WhiteInput from "./form/white-input";
import LavandaInput from "./form/lavanda-input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn, deletePhoto, pastelColors, uploadPhoto } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useGetCompany, useMutateAddemployee } from "@/hooks/use-company";
import { useToast } from "../ui/use-toast";
import { useHandleCatchError } from "@/hooks/use-handle-catch-error";
import { shuffle } from "lodash";

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
        const fileData = await uploadPhoto(currentPhoto);

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
          employeeColor: shuffle(pastelColors).pop(),
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
        await deletePhoto(userPublicId);
      }

      handleError({ error });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-[380px] flex justify-center mt-8">
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
          <h1 className="text-3xl text-center font-poppins">Add employee</h1>

          <div className="mt-8">
            <GridContainer className="grid-cols-3 grid-rows-2">
              <ImagePicker
                previewPhoto={previewPhoto}
                onChange={({ file, url }) => {
                  setCurrentPhoto(file);
                  setPreviewPhoto(url);
                }}
              />

              <div className="flex flex-col justify-between row-span-2">
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

              <div className="flex flex-col justify-between row-span-2">
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
                    value={employeeData.gender}
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

              <div className="flex items-end justify-end w-full">
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
                      className="w-5 h-5"
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

export default AddEmployeeModal;
