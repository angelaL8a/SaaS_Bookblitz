import AddClientModal from "@/components/admin/add-client-modal";
import CustomImage from "@/components/custom-image";
import PageContainer from "@/components/page-container";
import Table from "@/components/table/table";
import TableContent from "@/components/table/table-content";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useGetCompany, useMutateDeleteClient } from "@/hooks/use-company";
import { useHandleCatchError } from "@/hooks/use-handle-catch-error";
import { getTableDate } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { EyeIcon } from "lucide-react";

const clientDetailsColumns = ["Name", "Contact", "Phone", "Gender", "More"];

const ClientDetails = () => {
  const { handleError } = useHandleCatchError();

  const { data, refetch } = useGetCompany();
  const { mutateAsync: mutateDeleteClient } = useMutateDeleteClient();

  const clients = data?.users.filter((u) => u.role === "Client");

  const deleteClient = async (id) => {
    if (!data) return;

    try {
      const response = await mutateDeleteClient({
        companyId: data.id,
        clientId: id,
      });

      if (response) {
        refetch();

        return;
      }
    } catch (error) {
      handleError({ error });
    }
  };

  return (
    <PageContainer>
      <h1 className="text-5xl text-[#828282] font-poppins text-center font-[200]">
        Client Directory
      </h1>

      <Table
        columns={clientDetailsColumns}
        headerClassName="[background:linear-gradient(180deg,#D3FFFC_0%,#A0FFFF_100%)]"
        containerClassName="max-w-[900px] mx-auto"
      >
        {clients.map((client, index) => (
          <TableContent
            key={index}
            columns={clientDetailsColumns}
            columnsData={[
              {
                name: "Name",
                element: (
                  <div className="flex items-center gap-2">
                    <CustomImage
                      src={client.user.userImageUrl}
                      className="w-10 h-10 rounded-full"
                    />

                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[#25213B] text-lg font-medium truncate">
                        {client.user.name}
                      </span>
                      <span className="text-[#6E6893] -mt-1.5 text-sm truncate">
                        {getTableDate(client.birthDate)}
                      </span>
                    </div>
                  </div>
                ),
              },
              {
                name: "Contact",
                element: (
                  <div className="flex items-center justify-center text-[#6E6893]">
                    <span className="truncate">{client.email}</span>
                  </div>
                ),
              },
              {
                name: "Phone",
                element: (
                  <div className="flex items-center justify-center text-[#6E6893]">
                    {client.telephone}
                  </div>
                ),
              },
              {
                name: "Gender",
                element: (
                  <div className="flex items-start justify-center text-[#ACACAC] uppercase">
                    {client.gender}
                  </div>
                ),
              },
              {
                name: "More",
                element: (
                  <div className="flex items-center justify-end gap-2 pr-6">
                    <button className="flex items-center justify-center w-8 h-8 rounded-sm hover:bg-[rgba(255,255,255,0.31)] hover:shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]">
                      <EyeIcon className="w-5 h-5 text-muted-foreground" />
                    </button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          type="button"
                          className="flex items-center justify-center w-8 h-8 rounded-sm hover:bg-[rgba(255,255,255,0.31)] hover:shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]"
                        >
                          <Trash2Icon className="w-5 h-5 text-muted-foreground" />
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the client and all the related appointments
                            from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteClient(client.id)}
                            className="text-red-500"
                          >
                            Delete client
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ),
              },
            ]}
          />
        ))}
      </Table>

      <div className="flex justify-center pt-4 pb-12">
        <AddClientModal />
      </div>
    </PageContainer>
  );
};

export default ClientDetails;
