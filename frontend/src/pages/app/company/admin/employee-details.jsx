import PageContainer from "@/components/page-container";
import AddEmployeeModal from "@/components/admin/add-employee-modal";
import TableContent from "@/components/table/table-content";
import CustomImage from "@/components/custom-image";
import Rating from "@/components/table/rating";
import Table from "@/components/table/table";
import { useGetCompany, useMutateDeleteEmployee } from "@/hooks/use-company";
import { getTableDate } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { useHandleCatchError } from "@/hooks/use-handle-catch-error";
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
import PreviewMember from "@/components/admin/preview-member";

const employeeDetailsColumns = [
  "Name",
  "Contact",
  "Phone",
  "Position",
  "Gender",
  "Address",
  "Average Rating",
  "More",
];

const EmployeeDetails = () => {
  const { handleError } = useHandleCatchError();

  const { data, refetch } = useGetCompany();
  const { mutateAsync: mutateDeleteEmployee } = useMutateDeleteEmployee();

  const employees = data?.users.filter((u) => u.role === "Employee");

  const deleteEmployee = async (id) => {
    if (!data) return;

    try {
      const response = await mutateDeleteEmployee({
        companyId: data.id,
        employeeId: id,
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
        Employee Directory
      </h1>

      <Table columns={employeeDetailsColumns}>
        {employees.length > 0 ? (
          <>
            {employees.map((employee, index) => (
              <TableContent
                key={index}
                columns={employeeDetailsColumns}
                columnsData={[
                  {
                    name: "Name",
                    element: (
                      <div className="flex items-center gap-2">
                        <CustomImage
                          src={employee.user.userImageUrl}
                          className="w-10 h-10 rounded-full"
                        />

                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[#25213B] text-lg font-medium truncate">
                            {employee.user.name}
                          </span>
                          <span className="text-[#6E6893] -mt-1.5 text-sm truncate">
                            {getTableDate(employee.birthDate)}
                          </span>
                        </div>
                      </div>
                    ),
                  },
                  {
                    name: "Contact",
                    element: (
                      <div className="flex items-center justify-center text-[#6E6893]">
                        <span className="truncate">{employee.email}</span>
                      </div>
                    ),
                  },
                  {
                    name: "Phone",
                    element: (
                      <div className="flex items-center justify-center text-[#6E6893]">
                        {employee.telephone}
                      </div>
                    ),
                  },
                  {
                    name: "Position",
                    element: (
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#F1BEF3]">
                          <div className="h-2 w-2 bg-[#8E8E8E] rounded-full"></div>

                          {employee.position}
                        </div>
                      </div>
                    ),
                  },
                  {
                    name: "Gender",
                    element: (
                      <div className="flex items-start justify-center text-[#ACACAC] uppercase">
                        {employee.gender}
                      </div>
                    ),
                  },
                  {
                    name: "Address",
                    element: (
                      <div className="flex items-start justify-center text-[#6E6893]">
                        <span className="truncate">{employee.address}</span>
                      </div>
                    ),
                  },
                  {
                    name: "Average Rating",
                    element: (
                      <div className="flex items-start justify-center">
                        <Rating
                          color={employee.employeeColor}
                          value={Math.floor(Math.random() * (5 - 1 + 1)) + 1}
                        />
                      </div>
                    ),
                  },
                  {
                    name: "More",
                    element: (
                      <div className="flex items-center justify-end gap-2 pr-6">
                        <PreviewMember member={employee}>
                          <button
                            type="button"
                            className="flex items-center justify-center w-8 h-8 rounded-sm hover:bg-[rgba(255,255,255,0.31)] hover:shadow-[0px_2px_5px_0px_rgba(0,0,0,0.10)]"
                          >
                            <EyeIcon className="w-5 h-5 text-muted-foreground" />
                          </button>
                        </PreviewMember>

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
                                This action cannot be undone. This will
                                permanently delete the employee and all the
                                related appointments and shifts from our
                                servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteEmployee(employee.id)}
                                className="text-white bg-red-300"
                              >
                                Delete employee
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
          </>
        ) : (
          <div className="flex items-center justify-center p-5">
            No employees here. Add one to see the magic.
          </div>
        )}
      </Table>

      <div className="flex justify-center pt-4">
        <AddEmployeeModal />
      </div>
    </PageContainer>
  );
};

export default EmployeeDetails;
