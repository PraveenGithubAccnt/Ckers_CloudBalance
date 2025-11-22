import { Routes, Route } from "react-router-dom";
import LogInPage from './LogInPage';
import DashBoard from '../dashboard/DashBoard';
import CostExplorer from '../dashboard/components/SideMenuBar/CostExplorer';
import ProtectedRoute from "./ProtectedRout";
import AwsServices from "../dashboard/components/SideMenuBar/AwsServices";
import OnBoarding from "../dashboard/components/SideMenuBar/OnBoarding";
import UserManagement from "../dashboard/components/SideMenuBar/UserManagement";
import AddUser from "../dashboard/users/AddUser";

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
