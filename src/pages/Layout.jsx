import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/auth/useAuth";

export default function Layout() {
  const { isLoading, isError, data } = useGetUserInfo();
  return (
    <div>
      <Header />
      <div className="min-h-screen md:px-25 px-5 py-7">
        <Outlet />
      </div>
    </div>
  );
}
