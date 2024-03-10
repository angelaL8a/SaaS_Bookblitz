import ImagePicker from "../image-picker";
import GridContainer from "./form/grid-container";
import CustomLoader from "../custom-loader";
import CyanInput from "./form/cyan-input";
import WhiteInput from "./form/white-input";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import DatePicker from "../date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn, deletePhoto, uploadPhoto } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import { useHandleCatchError } from "@/hooks/use-handle-catch-error";
import { useGetCompany, useMutateAddClient } from "@/hooks/use-company";

const AddClientModal = () => {
  const { toast } = useToast();
  const { handleError } = useHandleCatchError();

  const [clientData, setClientData] = useState({
    firstName: "",
    lastName: "",
    birthDate: null,
    gender: "",
    email: "",
    telephone: "",
  });
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  const [isPending, setIsPending] = useState(false);

  const { data: company, refetch } = useGetCompany();
  const { mutateAsync } = useMutateAddClient();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClientData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addClient = async () => {
    if (!company) return;

    let userSecureUrl;
    let userPublicId;

    try {
      setIsPending(true);
      if (currentPhoto) {
        const fileData = await uploadPhoto(currentPhoto);

        userSecureUrl = fileData.secure_url;
        userPublicId = fileData.public_id;
      }

      const newClientData = await mutateAsync({
        companyId: company.id,
        clientDto: {
          ...clientData,
          userImageUrl: userSecureUrl,
          userImageId: userPublicId,
        },
      });

      if (newClientData) {
        refetch();

        setClientData({
          firstName: "",
          lastName: "",
          birthDate: null,
          gender: "",
          email: "",
          telephone: "",
        });
        setCurrentPhoto(null);
        setPreviewPhoto(null);

        toast({
          title: "Client Added",
          description: "Client added successfully.",
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
            Add new client
          </button>
        </div>
      </DialogTrigger>

      <DialogContent
        withCloseButton={false}
        className="max-w-[600px] gap-0 shadow-[0px_9.923px_16.8px_-3px_rgba(0,0,0,0.10)] py-5 px-10 max-h-[800px] overflow-y-auto [background:linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(240,253,255,0.94)_0.01%,rgba(255,255,255,0.94)_51.71%,rgba(247,254,255,0.94)_100%)]"
      >
        <div className="flex justify-between">
          <div></div>

          <DialogClose asChild>
            <Button
              variant="unstyled"
              className="rounded-full [background:linear-gradient(180deg,#9BF2F2_0%,#4CE0E0_100%)] shadow-[0px_4px_4.3px_-3px_rgba(34,144,144,0.60)] -mr-5 text-white"
            >
              Cancel
            </Button>
          </DialogClose>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            addClient();
          }}
        >
          <h1 className="text-3xl text-center font-poppins">Add client</h1>

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
                <CyanInput
                  label="First name(s)"
                  placeholder="Romina Ariel"
                  name="firstName"
                  onChange={handleChange}
                  value={clientData.firstName}
                />

                <div>
                  <label className="text-[#747474] text-[15px] font-medium font-poppins">
                    Birth Date
                  </label>

                  <DatePicker
                    date={clientData.birthDate}
                    setDate={(date) => {
                      setClientData({
                        ...clientData,
                        birthDate: date,
                      });
                    }}
                    label="25/11/2022"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between row-span-2">
                <CyanInput
                  label="Last Name"
                  placeholder="Jacobs Jenkins"
                  name="lastName"
                  onChange={handleChange}
                  value={clientData.lastName}
                />

                <div>
                  <label className="text-[#747474] text-[15px] font-medium font-poppins">
                    Gender
                  </label>

                  <Select
                    onValueChange={(value) => {
                      setClientData({
                        ...clientData,
                        gender: value,
                      });
                    }}
                    value={clientData.gender}
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
                value={clientData.email}
              />

              <WhiteInput
                label="Telephone"
                placeholder="(808) 555 - 0111"
                name="telephone"
                onChange={handleChange}
                value={clientData.telephone}
              />
            </GridContainer>

            <div className="flex items-center justify-center w-full mt-5">
              <Button
                variant="unstyled"
                className="rounded-full shadow-[0px_4px_4.3px_-3px_rgba(34,144,144,0.60)] [background:linear-gradient(180deg,#9BF2F2_0%,#4CE0E0_100%)] text-white"
                type="submit"
                disabled={
                  isPending ||
                  !clientData.firstName ||
                  !clientData.lastName ||
                  !clientData.birthDate ||
                  !clientData.gender ||
                  !clientData.email ||
                  !clientData.telephone
                }
              >
                {isPending ? (
                  <CustomLoader
                    containerClassName="mr-2 mt-0"
                    className="w-5 h-5"
                  />
                ) : null}
                Add client
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientModal;
