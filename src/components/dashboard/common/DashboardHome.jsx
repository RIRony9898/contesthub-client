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
    </div>
  );
}

export default DashboardHome;
