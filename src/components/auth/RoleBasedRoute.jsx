import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/UseContext";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuthContext();
  const location = useLocation();

  if (!auth.user) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!auth.user.role || !allowedRoles.includes(auth.user.role)) {
    // Redirect to dashboard home if role not allowed
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleBasedRoute;
