import { Outlet, Navigate } from "react-router";

const AuthProtectedRoute = () => {
  const user = null;

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthProtectedRoute;