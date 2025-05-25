import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { createAnnouncement, fetchAnnouncements } from "@/api/announcements";

export const useAnnouncements = (): UseQueryResult<[]> => {
  return useQuery<any>({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
    refetchOnWindowFocus: false,
    retry: false,
    initialData: [],
  });
};

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (announcementData: {
      title: string;
      content: string;
      date: string;
    }) => createAnnouncement(announcementData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
};