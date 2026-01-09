import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/authAccess";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = getUserRole();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard/costexplorer" replace />;
  }

  return children;
}

export default ProtectedRoute;
