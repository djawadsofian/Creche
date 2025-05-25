import Login from "../pages/auth/login";
import Login2 from "../pages/auth/login2"; // Assuming you have Login2 component
import SignUp from "../pages/auth/signUp";
import SignUp2 from "../pages/auth/signUp2"; // Assuming you have SignUp2 component
import Home from "../pages/home/Home";
import Home2 from "../pages/home/Home2"; // Assuming you have Home2 component
import Profile from "@/pages/Profile/Profile";
import Profile2 from "@/pages/Profile/Profile2"; // Assuming you have Profile2 component

// Set this constant to 1 or 2 to switch between versions
const VERSION = 2; // Change this to 2 to use version 2 components

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

// Helper function to get the appropriate component based on version
const getComponent = (Component: React.ComponentType, Component2: React.ComponentType) => {
  return VERSION === 1 ? <Component /> : <Component2 />;
};

export const crecheroutes: RouteConfig[] = [
  { 
    path: "/", 
    element: getComponent(Home, Home2) 
  },
  { 
    path: "/signin", 
    element: getComponent(Login, Login2) 
  },
  { 
    path: "/signup", 
    element: getComponent(SignUp, SignUp2) 
  },
  { 
    path: "/profile/parent/:id", 
    element: getComponent(Profile, Profile2) 
  },
  { 
    path: "/profile/admin/:id", 
    element: getComponent(Profile, Profile2) 
  },
];
