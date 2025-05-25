import { Icon } from "@iconify/react";
import { ReactSVG } from "react-svg";
import { useEffect, useMemo, useState } from "react";
import logo from "@/assets/istockphoto-1165158707-612x612-removebg-preview.png";
import { useWebSocket } from "./useWebsocket";
import Notification from "./Notification";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink, useNavigate } from "react-router-dom";

const Header2 = () => {
  const { messages } = useWebSocket();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const storedAdmin = localStorage.getItem("admin");
  const storedParent = localStorage.getItem("parent");

  const admin = storedAdmin ? JSON.parse(storedAdmin) : null;
  const parent = storedParent ? JSON.parse(storedParent) : null;
  const id = admin?.role == role ? admin?.id : parent?.id;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [messages]);

  const toggleNotifications = () => {
    setIsOpen(true);
  };

  return (
    <header className="fixed w-full z-50 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} className="w-16 h-16 mr-4" alt="Logo" />
            <h1 className="text-2xl font-bold text-white">Little Stars</h1>
          </div>

          {/* Navigation and User Actions */}
          <div className="flex items-center space-x-6">
            {admin || parent ? (
              <>
                {/* Notification Bell */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button
                      onClick={toggleNotifications}
                      className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
                      aria-label="Notifications"
                    >
                      <Icon 
                        icon="mdi:bell-outline" 
                        width="24" 
                        height="24" 
                        className="text-white"
                      />
                      {messages?.filter(msg => msg.type === "notification").length > 0 && !isOpen && (
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#00b4d8] rounded-full"></span>
                      )}
                    </button>
                  </SheetTrigger>
                  <SheetContent className="bg-white p-0">
                    <div className="p-6">
                      <SheetTitle className="text-2xl font-bold text-[#1a1a2e] mb-6">
                        Notifications
                      </SheetTitle>
                      <Notification />
                    </div>
                  </SheetContent>
                </Sheet>

                

                {/* Logout Button */}
                <button
                  onClick={() => {
                    localStorage.removeItem("access_token")
                    navigate("/signin");
                  }}
                  className="px-4 py-2 rounded-lg bg-[#f72585] hover:bg-[#f72585]/90 text-white font-medium transition-colors shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              /* Login Button */
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-2 rounded-lg bg-[#00b4d8] hover:bg-[#0096c7] text-white font-medium transition-colors shadow-md"
              >
                Login
              </button>
              
            )}
            {/* Profile Button */}
            <button
                  onClick={() => navigate(`profile/${role}/${id}`)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Profile"
                >
                  <Icon 
                    icon="mdi:account-outline" 
                    width="20" 
                    height="20" 
                    className="text-white"
                  />
                  <span className="text-white font-medium">Profile</span>
                </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header2;