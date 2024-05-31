import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Lucide from "../../../base-components/Lucide";
import { Menu, Close } from "@mui/icons-material";
import Button from "../../../base-components/Button";

function AccountPage() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleTabChange = (tab: string) => {
    navigate(`/manager/account/${tab}`);
  };

  useEffect(() => {
    if (location.pathname === "/manager/account") {
      navigate("/manager/account/config");
    }
  }, [location.pathname, navigate]);


  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between top-0 w-full p-4">
        <Link to="/manager" className="text-lg font-bold">
          <Lucide icon={"X"} />
        </Link>
        <h1 className="text-xl font-bold ml-20">Account</h1>
        <div></div>
        <div className="sm:hidden ml-6">
          <Button
            variant="instagram"
            type="button"
            className="border-none cursor-pointer rounded-full shadow-none"
            style={{ backgroundColor: "transparent", color: "black" }}
            onClick={toggleCollapse}
          >
            {isCollapsed ? <Menu /> : <Close />}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-y-auto">
        {/* Left Nav for Mobile */}
        <div
          className={`fixed inset-0 z-40 transition-transform transform ${
            isCollapsed ? "-translate-x-full" : "translate-x-0"
          } sm:hidden`}
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleCollapse}
          ></div>
          <div className="relative bg-white w-64 h-full p-4 flex flex-col space-y-3">
            <button
              className={`w-full py-2 px-3 rounded-lg text-left ${
                location.pathname.includes("config")
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("config")}
            >
              Configuration
            </button>
            <button
              className={`w-full py-2 px-3 rounded-lg text-left ${
                location.pathname.includes("role")
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("role")}
            >
              Role
            </button>
          </div>
        </div>

        {/* Left Nav for Desktop */}
        <div className="hidden sm:flex flex-col space-y-3 w-64 p-4">
          <button
            className={`w-full py-2 px-3 rounded-lg text-left ${
              location.pathname.includes("config")
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("config")}
          >
            Configuration
          </button>
          <button
            className={`w-full py-2 px-3 rounded-lg text-left ${
              location.pathname.includes("role")
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabChange("role")}
          >
            Role
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-x-auto overflow-y-auto min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
