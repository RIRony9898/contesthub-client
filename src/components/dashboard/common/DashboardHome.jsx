import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hook/UseAuth";

function DashboardHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddContest = () => {
    navigate("/dashboard/add-contest");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your contests and track your progress
        </p>
      </div>

      {user?.role === "creator" && (
        <div className="flex justify-center">
          <button
            onClick={handleAddContest}
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <PlusCircle className="w-6 h-6" />
            Add New Contest
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardHome;
