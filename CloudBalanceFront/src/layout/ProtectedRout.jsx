import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role, authLoading, userId } = useSelector(
    (state) => state.auth
  );
console.log({ authLoading, isAuthenticated, role, userId });

  //Wait for profile API
  if (authLoading) return null; 

  //Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  //Role not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard/costexplorer" replace />;
  }

  return children;
}

export default ProtectedRoute;
