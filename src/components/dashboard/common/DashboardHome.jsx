import {
  Award,
  Calendar,
  DollarSign,
  Eye,
  PlusCircle,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hook/UseAuth";

function DashboardHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    contestsCreated: 0,
    contestsParticipated: 0,
    winnings: 0,
    activeContests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Mock stats for now - in real app, fetch from API
        setStats({
          contestsCreated: user?.role === "creator" ? 5 : 0,
          contestsParticipated: 12,
          winnings: 450,
          activeContests: 3,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const quickActions = [
    {
      title: "Browse Contests",
      description: "Explore available contests",
      icon: Eye,
      path: "/all-contests",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "View Profile",
      description: "Manage your profile",
      icon: Users,
      path: "/dashboard/profile",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Participated Contests",
      description: "Track your submissions",
      icon: Calendar,
      path: "/dashboard/participated",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Winning Contests",
      description: "View your achievements",
      icon: Trophy,
      path: "/dashboard/winning",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  if (user?.role === "creator") {
    quickActions.unshift({
      title: "Add New Contest",
      description: "Create a contest",
      icon: PlusCircle,
      path: "/dashboard/add-contest",
      color: "from-indigo-500 to-purple-500",
    });
  }

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome back, {user?.name || "User"}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {user?.role === "creator"
            ? "Manage your contests and grow your community"
            : "Participate in exciting contests and showcase your skills"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {user?.role === "creator" ? "Contests Created" : "Participated"}
              </p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {loading
                  ? "..."
                  : user?.role === "creator"
                  ? stats.contestsCreated
                  : stats.contestsParticipated}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              {user?.role === "creator" ? (
                <PlusCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              ) : (
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Winnings
              </p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                ${loading ? "..." : stats.winnings}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Contests
              </p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {loading ? "..." : stats.activeContests}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Achievements
              </p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {loading
                  ? "..."
                  : stats.contestsParticipated > 0
                  ? Math.floor(stats.contestsParticipated / 3)
                  : 0}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(action.path)}
              className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-zinc-800 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${action.color}`}
                >
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                Welcome to ContestHub!
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Start exploring contests and building your portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
