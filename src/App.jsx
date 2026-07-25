import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ClassPage from "./pages/ClassPage";
import CommunityPage from "./pages/CommunityPage";
import StudentsPage from "./pages/StudentsPage";
import NotificationsPage from "./pages/NotificationsPage";
import { userLoader } from "./loaders/userLoader";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      loader: userLoader,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "/class", element: <ClassPage /> },
        { path: "/community", element: <CommunityPage /> },
        { path: "/students", element: <StudentsPage /> },
        { path: "/notifications", element: <NotificationsPage /> },
      ],
    },
    { path: "/login", element: <LoginPage /> },
  ]);
  return <RouterProvider router={router} />;
}
