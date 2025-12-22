import { Outlet, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Navbar from "../components/dashboard/common/Navbar";
import Sidebar from "../components/dashboard/common/Sidebar";
import useAuth from "../hook/UseAuth";

function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddContest = () => {
    navigate("/dashboard/add-contest");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main
          className="
            flex-1 overflow-y-auto
            px-4 md:px-6 pt-6 pb-24
            bg-zinc-50 dark:bg-zinc-900
          "
        >
          <Outlet />
        </main>
      </div>

      {/* Floating Add Contest Button for Creators */}
      {user?.role === "creator" && (
        <button
          onClick={handleAddContest}
          className="
            fixed bottom-6 right-6
            w-14 h-14
            bg-linear-to-r from-pink-500 to-purple-500
            hover:from-pink-600 hover:to-purple-600
            text-white
            rounded-full
            shadow-lg
            hover:shadow-xl
            transition-all duration-300
            flex items-center justify-center
            z-50
          "
          title="Add New Contest"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default DashboardLayout;
