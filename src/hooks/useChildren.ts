import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchChildren } from "@/api/children";

export const useChildren = (): UseQueryResult<[]> => {
  return useQuery<any>({
    queryKey: ["children"],
    queryFn: fetchChildren,
    refetchOnWindowFocus: false,
    retry: false,
    initialData: [],
  });
};