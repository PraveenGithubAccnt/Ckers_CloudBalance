import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LogInPage from './LogInPage';
import DashBoard from '../components/dashboard/DashBoard';
import CostExplorer from '../components/dashboard/components/SideMenuBar/components/CostExplorer';
import ProtectedRoute from "./ProtectedRout";
import AwsServices from "../components/dashboard/components/SideMenuBar/components/AwsServices";
import OnBoarding from "../components/dashboard/components/SideMenuBar/components/OnBoarding";
import UserManagement from "../components/dashboard/components/SideMenuBar/components/UserManagement";
import AddUser from "../components/dashboard/components/users/components/AddUser";
import NotFount from "./NotFount";

function Routing() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "logout") {
        // Clear localStorage and navigate to login
        localStorage.clear();
        navigate("/", { replace: true }); 
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

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
        <Route path="users" element={<UserManagement />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="costexplorer" element={<CostExplorer />} />
        <Route path="onboarding" element={<OnBoarding />} />
        <Route path="awsservices" element={<AwsServices />} />
      </Route>

      <Route path="*" element={<NotFount />} />
    </Routes>
  );
}

export default Routing;
