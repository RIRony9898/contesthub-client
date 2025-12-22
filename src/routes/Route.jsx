import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/auth/PrivateRoute";
import DashboardHome from "../components/dashboard/common/DashboardHome";
import DashboardLayout from "../layout/DashboardLayout";
import Contest from "../pages/Contest";
import Details from "../pages/Details";
import Home from "../pages/Home";
import Leaderboard from "../pages/Leaderboard";
import NotFound from "../pages/NotFound";
import Payment from "../pages/Payment";

const Route = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/all-contests", element: <Contest /> },
  { path: "/leaderboard", element: <Leaderboard /> },
  {
    path: "/contest/:id",
    element: (
      <PrivateRoute>
        <Details />
      </PrivateRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      <PrivateRoute>
        <Payment />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [{ index: true, element: <DashboardHome /> }],
  },
  { path: "*", element: <NotFound /> },
]);

export { Route };
