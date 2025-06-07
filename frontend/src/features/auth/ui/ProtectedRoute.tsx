import { useSelector } from "react-redux";
import { useAuthCheck } from "../../../processes/auth/useAuthCheck";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { StoreApp } from "@/app/providers/store";
import styled from "styled-components";

const ProtectedRouteStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  color: rgb(99 102 241);
  opacity: 0.5;
  font-size: 6rem;
`

export const ProtectedRoute = () => {
  const isAuthChecked = useAuthCheck();
  const isAuthenticated = useSelector(
    (store: StoreApp) => store.user.isAuthenticated,
  );
  const location = useLocation();
  if (!isAuthChecked) {
    return (
      <ProtectedRouteStyle>
        Loading...
      </ProtectedRouteStyle>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};
