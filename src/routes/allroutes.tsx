import WebSocketChat from "@/reseauxProject/WebSocket";
import Login from "../pages/auth/login";
import SignUp from "../pages/auth/signUp";
import Home from "../pages/home/Home";
import Profile from "@/pages/Profile/Profile";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

export const crecheroutes: RouteConfig[] = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/chat", element: <WebSocketChat /> },
  { path: "/profile/:id", element: <Profile /> },
];
