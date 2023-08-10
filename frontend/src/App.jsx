import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import ActivePostContext from "./context/ActivePost";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout/AppLayout";
import NotFound from "./ui/NotFound/NotFound";
import Protect from "./ui/Protect/Protect";
import Spinner from "./ui/Spinner/Spinner";
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Me = lazy(() => import("./pages/Me/Me"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Login = lazy(() => import("./pages/Login"));

const queryClient = new QueryClient();
export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/app"
              element={
                <Protect>
                  <ActivePostContext>
                    <AppLayout />
                  </ActivePostContext>
                </Protect>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="me" element={<Me />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile/:profileId" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </Suspense>
  );
}
