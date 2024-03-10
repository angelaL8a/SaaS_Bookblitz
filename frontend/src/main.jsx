/**
 * Description: This file defines the application routes and sets up the router configuration.
 */
import "./styles/index.css";

import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import WelcomePage from "./pages/welcome";
import NotFoundPage from "./pages/not-found";
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminSchedule from "./pages/app/company/admin/admin-schedule";
import CompanyLayout from "./layouts/CompanyLayout";
import EmployeeDetails from "./pages/app/company/admin/employee-details";
import ClientDetails from "./pages/app/company/admin/client-details";
import PayrollSummary from "./pages/app/company/admin/payroll-summary";
import HomePage from "./pages/app/home-page";
import EmployeeSchedule from "./pages/app/company/employee/employee-schedule";
import EmployeeLayout from "./layouts/EmployeeLayout";
import Summary from "./pages/app/company/employee/summary";
import ClientLayout from "./layouts/ClientLayout";
import ClientSchedule from "./pages/app/company/client/client-schedule";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfilePage from "./pages/app/company/profile";
import SettingsPage from "./pages/app/company/profile/settings";

// Define the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <LoginPage /> },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/app/:companyUrl",
        element: <CompanyLayout />,
        children: [
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              {
                path: "",
                element: <AdminSchedule />,
              },
              { path: "employee-details", element: <EmployeeDetails /> },
              { path: "client-details", element: <ClientDetails /> },
              { path: "payroll-summary", element: <PayrollSummary /> },
            ],
          },
          {
            path: "client",
            element: <ClientLayout />,
            children: [{ path: "", element: <ClientSchedule /> }],
          },
          {
            path: "employee",
            element: <EmployeeLayout />,
            children: [
              { path: "", element: <EmployeeSchedule /> },
              { path: "summary", element: <Summary /> },
            ],
          },
          {
            path: "profile",
            element: <ProfileLayout />,
            children: [
              { path: "", element: <ProfilePage /> },
              {
                path: "settings",
                element: <SettingsPage />,
              },
            ],
          },
        ],
      },
      {
        path: "welcome",
        element: <WelcomePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

// Create a new query client with custom default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      retry: 0,
      staleTime: Infinity,
    },
    mutations: {
      retry: 0,
    },
  },
  queryCache: new QueryCache(),
});

// Render the application with the configured router and query client
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
