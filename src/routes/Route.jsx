import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/auth/PrivateRoute";
import DashboardHome from "../components/dashboard/common/DashboardHome";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import Contest from "../pages/Contest";
import Details from "../pages/Details";
import Home from "../pages/Home";
import Leaderboard from "../pages/Leaderboard";
import NotFound from "../pages/NotFound";
import Payment from "../pages/Payment";

// User Dashboard Pages
import ParticipatedContests from "../components/dashboard/user/ParticipatedContests";
import UserProfile from "../components/dashboard/user/UserProfile";
import WinningContests from "../components/dashboard/user/WinningContests";

// Creator Dashboard Pages
import AddContest from "../components/dashboard/creator/AddContest";
import CreatedContests from "../components/dashboard/creator/CreatedContests";
import EditContest from "../components/dashboard/creator/EditContest";
import SubmittedTasks from "../components/dashboard/creator/SubmittedTasks";

// Admin Dashboard Pages
import ManageContests from "../components/dashboard/admin/ManageContests";
import ManageUsers from "../components/dashboard/admin/ManageUsers";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-contests", element: <Contest /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "contest/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      // User routes
      { path: "profile", element: <UserProfile /> },
      { path: "participated", element: <ParticipatedContests /> },
      { path: "winning", element: <WinningContests /> },
      // Creator routes
      { path: "add-contest", element: <AddContest /> },
      { path: "created-contests", element: <CreatedContests /> },
      { path: "submitted-tasks", element: <SubmittedTasks /> },
      { path: "edit-contest", element: <EditContest /> },
      // Admin routes
      { path: "manage-users", element: <ManageUsers /> },
      { path: "manage-contests", element: <ManageContests /> },
    ],
  },
]);

export { Route };
