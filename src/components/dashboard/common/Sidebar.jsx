import {
  FileText,
  FolderKanban,
  Gavel,
  Home,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Pencil,
  PlusCircle,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hook/UseAuth";
import TextOrCardLoader from "../../loader/TextOrcardLoader";

/*  USER  */
export const userOptions = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Winning Contests",
    path: "/dashboard/winning",
    icon: Trophy,
  },
  {
    name: "Participated Contests",
    path: "/dashboard/participated",
    icon: ListChecks,
  },
];

/*  ADMIN  */
export const adminOptions = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Statistics",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Users",
    path: "/dashboard/manage-users",
    icon: Users,
  },
  {
    name: "Manage Contests",
    path: "/dashboard/manage-contests",
    icon: Gavel,
  },
];

/* CREATOR */
export const creatorOptions = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Contest",
    path: "/dashboard/add-contest",
    icon: PlusCircle,
  },
  {
    name: "Created Contests",
    path: "/dashboard/created-contests",
    icon: FolderKanban,
  },
  {
    name: "Submitted Tasks",
    path: "/dashboard/submitted-tasks",
    icon: FileText,
  },
  {
    name: "Edit Contest",
    path: "/dashboard/edit-contest",
    icon: Pencil,
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50 h-screen w-72
          bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
          border-r border-slate-200/50 dark:border-slate-700/50
          px-6 py-6 flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          shadow-2xl lg:shadow-none
        `}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>

        {/* User Info */}
        <div>
          <div className="flex flex-col items-center gap-4 border-b border-slate-200/50 dark:border-slate-700/50 pb-6">
            <div className="relative">
              <img
                src={user?.photoURL || "https://via.placeholder.com/80"}
                alt="User"
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 break-all">
                {user?.email}
              </p>
            </div>
          </div>

          {!user?.role && <TextOrCardLoader />}

          {/* Navigation */}
          {user?.role && (
            <ul className="mt-8 space-y-2">
              {(user?.role === "user"
                ? userOptions
                : user?.role === "admin"
                ? adminOptions
                : creatorOptions
              )?.map((item, index) => (
                <li key={index}>
                  <NavLink
                    end
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                      flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-md"
                      }
                    `
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="truncate">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            flex items-center gap-4 px-4 py-3 mt-8 rounded-xl
            text-sm font-medium text-slate-600 dark:text-slate-300
            hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500
            transition-all duration-200 hover:shadow-md
          "
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
