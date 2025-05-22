import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchAnnouncements } from "@/api/announcements";

export const useAnnouncements = (): UseQueryResult<[]> => {
  return useQuery<any>({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
    refetchOnWindowFocus: false,
    retry: false,
    initialData: [],
  });
};