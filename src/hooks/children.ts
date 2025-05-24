import { useMutation, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { addChild, fetchChildren } from "@/api/children";

export const useChildren = (): UseQueryResult<[]> => {
  return useQuery<any>({
    queryKey: ["children"],
    queryFn: fetchChildren,
    refetchOnWindowFocus: false,
    retry: false,
    initialData: [],
  });
};

export const useAddChild = () => {
  return useMutation({
    mutationFn: (childData: {
      name: string;
      birthDate: string;
      allergies: string;
      specialNeeds: string;
      parent: { id: number };
    }) => addChild(childData),
  });
};