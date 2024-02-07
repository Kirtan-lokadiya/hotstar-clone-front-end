import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;
