import { ApiClient } from "@/utils/httpClient";

const client = ApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

export const createAnnouncement = async (announcementData: {
  title: string;
  content: string;
  date: string;
}) => {
  const token = localStorage.getItem("access_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await client.post("/announcements", announcementData, { headers });
  return response;
};

export const fetchAnnouncements = async () => {
  const token = localStorage.getItem("access_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await client.get("/announcements", { headers });
  return response;
};