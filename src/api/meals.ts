import { ApiClient } from "@/utils/httpClient";

const client = ApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

export const addMeal = async (mealData: {
  date: string;
  type: string;
  notes: string;
}) => {
  const token = localStorage.getItem("access_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await client.post("/meals", mealData, { headers });
  return response;
};

export const fetchMeals = async () => {
  const token = localStorage.getItem("access_token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await client.get("/meals", { headers });
  return response;
};