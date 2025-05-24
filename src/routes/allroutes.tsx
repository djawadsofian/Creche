import Login  from "../pages/auth/login";
import SignUp from "../pages/auth/signUp";
import Home from "../pages/home/Home";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

export const crecheroutes: RouteConfig[] = [
  { path: "/", element: <Home /> },
  { path: "/signin", element: <Login/>},
  { path: "/signup", element: <SignUp/>},
];
