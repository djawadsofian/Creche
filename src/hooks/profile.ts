import { fetchProfile, fetchProfileById, updateProfile } from "@/api/profile";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyProfile = (): UseQueryResult<[]> => {
  const token = localStorage.getItem("token");

  return useQuery<any>({
    queryKey: ["myProfile", token],
    queryFn: fetchProfile,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!token,
  });
};

export const useUpdateProfile = (profile: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updateProfile(profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
};

export const useProfileById = (id: number): UseQueryResult<any> => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["profile", id, token],
    queryFn: () => fetchProfileById(id),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!token && !!id, // Only fetch if we have both token and id
  });
};
