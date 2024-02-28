import { client } from "@/graphql/client";
import {
  Company_AddClient,
  Company_AddEmployee,
  Company_DeleteClient,
  Company_DeleteEmployee,
  Shift_CreateShift,
  Shift_DeleteShift,
  Shift_UpdateShift,
} from "@/graphql/mutations/company";
import { Company_GetPayroll, GetCompany } from "@/graphql/queries/company";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
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

export const addClient = async ({ clientDto, companyId }) => {
  const data = await client.request(Company_AddClient.toString(), {
    clientDto,
    companyId,
  });

  return data.Company_AddClient;
};

export const createShift = async ({ shiftDto, companyId }) => {
  const data = await client.request(Shift_CreateShift.toString(), {
    shiftDto,
    companyId,
  });

  return data.Shift_CreateShift;
};

export const updateShift = async ({ shiftId, shiftDto, companyId }) => {
  const data = await client.request(Shift_UpdateShift.toString(), {
    shiftId,
    shiftDto,
    companyId,
  });

  return data.Shift_UpdateShift;
};

export const deleteShift = async ({ shiftId, companyId }) => {
  const data = await client.request(Shift_DeleteShift.toString(), {
    shiftId,
    companyId,
  });

  return data.Shift_DeleteShift;
};

export const deleteEmployee = async ({ companyId, employeeId }) => {
  const data = await client.request(Company_DeleteEmployee.toString(), {
    companyId,
    employeeId,
  });

  return data.Company_DeleteEmployee;
};

export const deleteClient = async ({ clientId, companyId }) => {
  const data = await client.request(Company_DeleteClient.toString(), {
    clientId,
    companyId,
  });

  return data.Company_DeleteClient;
};

export const getPayroll = async ({ companyId, filter }) => {
  const data = await client.request(Company_GetPayroll.toString(), {
    companyId,
    filter,
  });

  return data.Company_GetPayroll;
};

// Options
export const getUseGetCompanyOptions = ({ companyUrl }) => {
  return queryOptions({
    queryKey: ["company", companyUrl],
    queryFn: () => getCompany(companyUrl),
  });
};

// Hooks
export const useGetCompany = () => {
  const { companyUrl } = useParams();

  const { data, isPending, refetch } = useQuery(
    getUseGetCompanyOptions({ companyUrl })
  );

  return { data, isPending, refetch };
};

export const useMutateAddemployee = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ employeeDto, companyId }) =>
      addEmployee({ employeeDto, companyId }),
  });

  return { isPending, mutateAsync };
};

export const useMutateAddClient = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ clientDto, companyId }) =>
      addClient({ clientDto, companyId }),
  });

  return { mutateAsync, isPending };
};

export const useMutateCreateShift = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ shiftDto, companyId }) =>
      createShift({ shiftDto, companyId }),
  });

  return { isPending, mutateAsync };
};

export const useMutateUpdateShift = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ shiftId, shiftDto, companyId }) =>
      updateShift({ shiftId, shiftDto, companyId }),
  });

  return { isPending, mutateAsync };
};

export const useMutateDeleteShift = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ shiftId, companyId }) => deleteShift({ shiftId, companyId }),
  });

  return { isPending, mutateAsync };
};

export const useMutateDeleteEmployee = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ companyId, employeeId }) =>
      deleteEmployee({ companyId, employeeId }),
  });

  return { isPending, mutateAsync };
};

export const useMutateDeleteClient = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ clientId, companyId }) =>
      deleteClient({ clientId, companyId }),
  });

  return { isPending, mutateAsync };
};

export const useGetPayroll = ({
  companyId,
  fromMonth,
  toMonth,
  startDay,
  endDay,
  fromYear,
  toYear,
}) => {
  const { data, refetch, isPending } = useQuery({
    queryKey: [
      "payroll",
      companyId,
      fromMonth,
      toMonth,
      startDay,
      endDay,
      fromYear,
      toYear,
    ],
    queryFn: () =>
      getPayroll({
        companyId,
        filter: { fromMonth, toMonth, startDay, endDay, fromYear, toYear },
      }),
    enabled:
      companyId !== undefined &&
      startDay !== undefined &&
      endDay !== undefined &&
      fromMonth !== undefined &&
      fromMonth !== null &&
      toMonth !== undefined &&
      toMonth !== null &&
      fromYear !== undefined &&
      toYear !== undefined,
  });

  return { payrollData: data, refetch, isPending };
};
