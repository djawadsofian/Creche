import { ApiClient } from "@/utils/httpClient";

const client = ApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

export const addChild = async (childData: {
  name: string;
  birthDate: string;
  allergies: string;
  specialNeeds: string;
  parent: { id: number };
}) => {
  const token = localStorage.getItem("access_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await client.post("/children", childData, { headers });
  return response;
};

export const fetchChildren = async () => {
  const token = localStorage.getItem("access_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await client.get("/children", { headers });
  return response;
};
