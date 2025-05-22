import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchUsers } from "@/api/users";

export const useUsers = (): UseQueryResult<[]> => {
  return useQuery<any>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    retry: false,
    initialData: [],
  });
};