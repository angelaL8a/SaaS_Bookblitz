import { client } from "@/graphql/client";
import { GetCompany } from "@/graphql/queries/company";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Handlers
export const getCompany = async (companyUrl) => {
  const data = await client.request(GetCompany.toString(), {
    companyUrl,
  });

  return data.GetCompany;
};

// Hooks
export const useGetCompany = () => {
  const { companyUrl } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["company", companyUrl],
    queryFn: () => getCompany(companyUrl),
  });

  return { data, isPending };
};
