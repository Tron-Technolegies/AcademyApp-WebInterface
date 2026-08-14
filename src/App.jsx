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
import LeaderboardPage from "./pages/LeaderboardPage";
import AddClass from "./pages/AddClass";
import ForgotPassword from "./pages/ForgotPassword";
import MyCourses from "./pages/MyCourses";
import LiveClassRoom from "./components/class/LiveClassRoom";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      // loader: userLoader,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "/class", element: <ClassPage /> },
        { path: "/class/add", element: <AddClass /> },
        { path: "/class/join/:classId", element: <LiveClassRoom /> },
        { path: "/community", element: <CommunityPage /> },
        { path: "/leaderboard", element: <LeaderboardPage /> },
        { path: "/students", element: <StudentsPage /> },
        { path: "/notifications", element: <NotificationsPage /> },
        { path: "/enrolled", element: <MyCourses /> },
      ],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
  ]);
  return <RouterProvider router={router} />;
}
