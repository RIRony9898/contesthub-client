import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/UseContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuthContext();
  const location = useLocation();

  if (!auth.user) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
