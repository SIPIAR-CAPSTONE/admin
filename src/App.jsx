import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import BroadcastPage from "@/pages/BroadcastPage";
import IncidentHistoryPage from "@/pages/IncidentHistoryPage";
import IncidentInfoPage from "@/pages/IncidentInfoPage";
import RequestInfoPage from "@/pages/RequestInfoPage";
import UserInfoPage from "@/pages/UserInfoPage";
import VerificationRequestPage from "@/pages/VerificationRequestPage";
import UsersPage from "@/pages/UsersPage";
import useTheme from "@/components/ThemeSwitcher/useTheme";

function App() {
  useTheme(); //initialize theme

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserInfoPage />} />
        <Route path="incidents" element={<IncidentHistoryPage />} />
        <Route path="incidents/:id" element={<IncidentInfoPage />} />
        <Route path="broadcast" element={<BroadcastPage />} />
        <Route
          path="verification-request"
          element={<VerificationRequestPage />}
        />
        <Route path="verification-request/:id" element={<RequestInfoPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
