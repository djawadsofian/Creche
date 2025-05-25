import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { addMeal, fetchMeals } from "@/api/meals";

export const useMeals = (): UseQueryResult<[]> => {
  return useQuery<any>({
    queryKey: ["meals"],
    queryFn: fetchMeals,
    refetchOnWindowFocus: false,
    retry: false,
    initialData: [],
  });
};

export const useAddMeal = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (mealData: {
      date: string;
      type: string;
      notes: string;
    }) => addMeal(mealData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
    },
  });
};