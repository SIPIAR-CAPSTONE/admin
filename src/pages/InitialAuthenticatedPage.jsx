import { useAuth } from "@/context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function InitialAuthenticatedPage() {
  const { role } = useAuth();

  if (role === "verifier") {
    return <Navigate to="/verification-request" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}
