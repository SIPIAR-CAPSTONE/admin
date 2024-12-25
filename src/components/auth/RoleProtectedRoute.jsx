// src/components/RoleProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import MainLayout from "@/layouts/MainLayout";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { role, user } = useAuth();
  const location = useLocation();

  if (!user) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default RoleProtectedRoute;
