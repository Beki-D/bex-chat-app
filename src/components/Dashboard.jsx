import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  User,
  Settings,
  Bell,
  LogOut,
  Users,
} from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const userName = data?.me?.name || "Guest";
  const userRole = data?.me?.role || "user";

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-gray-100 w-16 md:w-64 transition-transform duration-300 ease-in-out z-10 fixed inset-y-0">
        <div className="p-4 flex flex-col h-screen mt-16">
          <nav className="flex-grow">
            {[
              {
                to: "/dashboard/chat",
                icon: <MessageSquare />,
                label: "Chat",
              },
              { to: "/dashboard/profile", icon: <User />, label: "Profile" },
              {
                to: "/dashboard/settings",
                icon: <Settings />,
                label: "Settings",
              },
              {
                to: "/dashboard/notifications",
                icon: <Bell />,
                label: "Notifications",
              },
              ...(userRole === "admin"
                ? [
                    {
                      to: "/dashboard/admin",
                      icon: <Users />,
                      label: "Admin Panel",
                    },
                  ]
                : []),
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center py-3 px-1 hover:bg-gray-700 rounded-lg mb-2 transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-6 h-6">
                  {item.icon}
                </div>
                <span className="ml-4 hidden md:inline">{item.label}</span>
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="flex items-center px-1 hover:bg-gray-700 rounded-lg transition-colors duration-200 mb-20"
            aria-label="Logout"
          >
            <div className="flex items-center justify-center w-6 h-6">
              <LogOut />
            </div>
            <span className="ml-4 hidden md:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
          <div className="text-xl font-semibold">Welcome, {userName}</div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6" />
            <div className="w-8 h-8 bg-gray-600 rounded-full">
              <img
                src={"https://i.pravatar.cc/10"}
                alt="Profile"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 ml-16 mt-16 md:ml-64 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
