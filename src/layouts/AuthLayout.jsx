import { useAuth } from "@/context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

export default function AuthLayout() {
  const { user } = useAuth();
  const location = useLocation();

  return !user ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} replace />
  );
}
