import { useSelector } from "react-redux";
import { useAuthCheck } from "./hooks/useAuthCheck";
import { StoreApp } from "../store";
import { Navigate, useLocation, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const isAuthChecked = useAuthCheck();
  const isAuthenticated = useSelector(
    (store: StoreApp) => store.user.isAuthenticated,
  );
  const location = useLocation();
  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center h-[100vh] w-[100vw] text-sky-500 opacity-50 text-8xl">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};
