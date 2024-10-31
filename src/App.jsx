import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import BroadcastPage from "@/pages/BroadcastPage";
import IncidentHistoryPage from "@/pages/IncidentHistoryPage";
import IncidentInfoPage from "@/pages/IncidentInfoPage";
import RequestInfoPage from "@/pages/RequestInfoPage";
import UserInfoPage from "@/pages/UserInfoPage";
import VerificationRequestPage from "@/pages/VerificationRequestPage";
import VerifiedUserPage from "@/pages/VerifiedUserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="verified-user" element={<VerifiedUserPage />} />
        <Route path="verified-user/:id" element={<UserInfoPage />} />
        <Route path="incident" element={<IncidentHistoryPage />} />
        <Route path="incident/:id" element={<IncidentInfoPage />} />
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
