import { Routes, Route } from "react-router-dom";

import useTheme from "@/components/ThemeSwitcher/useTheme";
import { Toaster } from "@/components/ui/toaster";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/LoginPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import TokenVerificationPage from "@/pages/TokenVerificationPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import DashboardPage from "@/pages/DashboardPage";
import BroadcastPage from "@/pages/BroadcastPage";
import IncidentHistoryPage from "@/pages/IncidentHistoryPage";
import IncidentInfoPage from "@/pages/IncidentInfoPage";
import RequestInfoPage from "@/pages/RequestInfoPage";
import BystanderInfoPage from "@/pages/BystanderInfoPage";
import VerificationRequestPage from "@/pages/VerificationRequestPage";
import BystandersPage from "@/pages/BystandersPage";
import BugReportPage from "@/pages/BugReportPage";
import BugInfoPage from "@/pages/BugInfoPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  useTheme(); //initialize theme

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<DashboardPage />} />
          <Route
            path="verification-request"
            element={<VerificationRequestPage />}
          />
          <Route
            path="verification-request/:id"
            element={<RequestInfoPage />}
          />
          <Route path="bystanders" element={<BystandersPage />} />
          <Route path="bystanders/:id" element={<BystanderInfoPage />} />
          <Route path="incidents" element={<IncidentHistoryPage />} />
          <Route path="incidents/:id" element={<IncidentInfoPage />} />
          <Route path="broadcast" element={<BroadcastPage />} />
          <Route path="bug-report" element={<BugReportPage />} />
          <Route path="bug-report/:id" element={<BugInfoPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="token-verification" element={<TokenVerificationPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
