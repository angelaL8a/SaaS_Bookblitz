import { client } from "@/graphql/client";
import { Company_AddEmployee } from "@/graphql/mutations/company";
import { GetCompany } from "@/graphql/queries/company";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Handlers
export const getCompany = async (companyUrl) => {
  const data = await client.request(GetCompany.toString(), {
    companyUrl,
  });

  return data.GetCompany;
};

export const addEmployee = async ({ employeeDto, companyId }) => {
  const data = await client.request(Company_AddEmployee.toString(), {
    employeeDto,
    companyId,
  });

  return data.Company_AddEmployee;
};

// Hooks
export const useGetCompany = () => {
  const { companyUrl } = useParams();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["company", companyUrl],
    queryFn: () => getCompany(companyUrl),
  });

  return { data, isPending, refetch };
};

export const useMutateAddemployee = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ employeeDto, companyId }) =>
      addEmployee({ employeeDto, companyId }),
  });

  return { isPending, mutateAsync };
};
