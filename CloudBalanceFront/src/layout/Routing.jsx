import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logout} from "../redux/slice/authSlice"
import LogInPage from "./LogInPage";
import DashBoard from "../components/dashboard/DashBoard";
import CostExplorer from "../components/dashboard/components/SideMenuBar/components/CostExplorer";
import ProtectedRoute from "./ProtectedRout";
import AwsServices from "../components/dashboard/components/SideMenuBar/components/AwsServices";
import OnBoarding from "../components/dashboard/components/SideMenuBar/components/OnBoarding";
import UserManagement from "../components/dashboard/components/SideMenuBar/components/UserManagement";
import AddUser from "../components/dashboard/components/users/components/AddUser";
import NotFount from "./NotFount";

function Routing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "logout") {
        dispatch(logout());
        navigate("/", { replace: true });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LogInPage />} />

      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      >
        {/* ADMIN & READ ONLY */}
        <Route
          path="users"
          element={
            <ProtectedRoute allowedRoles={["admin", "read only"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY */}
        <Route
          path="users/add"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="onboarding"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <OnBoarding />
            </ProtectedRoute>
          }
        />

        {/* ALL ROLES */}
        <Route
          path="awsservices"
          element={
            <ProtectedRoute allowedRoles={["admin", "customer", "read only"]}>
              <AwsServices />
            </ProtectedRoute>
          }
        />

        <Route
          path="costexplorer"
          element={
            <ProtectedRoute allowedRoles={["admin", "customer", "read only"]}>
              <CostExplorer />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFount />} />
    </Routes>
  );
}

export default Routing;
