import { Routes, Route } from "react-router-dom";
import LogInPage from './LogInPage';
import DashBoard from '../components/dashboard/DashBoard'
import CostExplorer from '../components/dashboard/components/SideMenuBar/CostExplorer';
import ProtectedRoute from "./ProtectedRout";
import AwsServices from "../components/dashboard/components/SideMenuBar/AwsServices";
import OnBoarding from "../components/dashboard/components/SideMenuBar/OnBoarding";
import UserManagement from "../components/dashboard/components/SideMenuBar/UserManagement";
import AddUser from "../components/users/components/AddUser";

function Routing() {
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
    </Routes>
  );
}

export default Routing;
