import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchMeals } from "@/api/meals";

export const useMeals = (): UseQueryResult<[]> => {
  return useQuery<any>({
    queryKey: ["meals"],
    queryFn: fetchMeals,
    refetchOnWindowFocus: false,
    retry: false,
    initialData: [],
  });
};