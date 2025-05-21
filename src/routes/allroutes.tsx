import Home from "../pages/home/Home";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

export const crecheroutes: RouteConfig[] = [
  { path: "/", element: <Home /> },
  
];
