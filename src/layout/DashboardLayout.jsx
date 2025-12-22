import { Plus } from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/common/Navbar";
import Sidebar from "../components/dashboard/common/Sidebar";
import useAuth from "../hook/UseAuth";

function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddContest = () => {
    navigate("/dashboard/add-contest");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden lg:ml-0">
        {/* Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Main Content */}
        <main
          className="
            flex-1 overflow-y-auto
            px-4 md:px-8 pt-8 pb-24
            bg-transparent
            relative
          "
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Floating Add Contest Button for Creators */}
      {user?.role === "creator" && (
        <button
          onClick={handleAddContest}
          className="
            fixed bottom-8 left-8
            w-16 h-16
            bg-gradient-to-r from-indigo-500 to-purple-500
            hover:from-indigo-600 hover:to-purple-600
            text-white
            rounded-full
            shadow-2xl
            hover:shadow-3xl
            transition-all duration-300
            flex items-center justify-center
            z-50
            transform hover:scale-110
            animate-pulse
          "
          title="Add New Contest"
        >
          <Plus className="w-7 h-7" />
        </button>
      )}
    </div>
  );
}

export default DashboardLayout;
