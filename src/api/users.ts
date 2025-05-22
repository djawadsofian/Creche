import { ApiClient } from "@/utils/httpClient";

const client = ApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

export const fetchUsers = async () => {
  const token = localStorage.getItem("access_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await client.get("/users", { headers });
  return response;
};