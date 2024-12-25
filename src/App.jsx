import { Routes, Route } from "react-router-dom";

import useTheme from "@/components/ThemeSwitcher/useTheme";
import { Toaster } from "@/components/ui/toaster";
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
import RespondersPage from "@/pages/RespondersPage";
import NotFoundPage from "@/pages/NotFoundPage";
import RoleProtectedRoute from "@/components/auth/RoleProtectedRoute";
import InitialAuthenticatedPage from "@/pages/InitialAuthenticatedPage";
import ResponderInfoPage from "@/pages/ResponderInfoPage";

function App() {
  useTheme(); //initialize theme

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="token-verification" element={<TokenVerificationPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />

        {/* Admin & Verifier Routes */}
        <Route
          path="/"
          element={<RoleProtectedRoute allowedRoles={["admin", "verifier"]} />}
        >
          <Route index element={<InitialAuthenticatedPage />} />
        </Route>

        {/* Admin-Specific Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="broadcast" element={<BroadcastPage />} />
          <Route path="incidents" element={<IncidentHistoryPage />} />
          <Route path="incidents/:id" element={<IncidentInfoPage />} />
        </Route>

        {/* Verifier-Specific Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={["verifier"]} />}>
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
          <Route path="responders" element={<RespondersPage />} />
          <Route path="responders/:id" element={<ResponderInfoPage />} />
        </Route>

        {/* Fallback Route */}
        <Route path="unauthorized" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
