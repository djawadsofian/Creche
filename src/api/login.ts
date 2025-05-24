import { ApiClient } from "../utils/httpClient";

const client = ApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupFormValues {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: string;
}


export const login = async ({ email, password }: LoginCredentials) => {
    const data = {
        email: email,
        password: password,
    };
  const response = await client.post("/login", data);
    return response;
    
};

export const signup = async ({ name , userName , email, password, role }: SignupFormValues) => {
  const data = {
      name : name, 
      userName : userName, 
      email: email,
      password: password,
      role : role,
  }
  const response = await client.post("/users", data);
  return response;
}