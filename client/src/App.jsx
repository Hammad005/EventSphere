import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PageLayout from "./layout/PageLayout";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Toaster } from "sonner";
import { useAuthStore } from "./store/useAuthStore";
import Loading from "./components/Loading";
import DashBoardLayout from "./layout/DashBoardLayout";
import ManageEvents from "./pages/ManageEvents";
import Notifications from "./pages/Notifications";
import ManageUser from "./pages/ManageUser";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import { useChatStore } from "./store/useChatStore";
import { useEventStore } from "./store/useEventStore";

const protectedRoutes = (condition, children, navigate) => {
  return condition ? children : <Navigate to={navigate} />;
};
const App = () => {
  const { authLoading, user, checkAuth, getAllUsers } = useAuthStore();
  const { getMessages } = useChatStore();
  const { getAllEvents } = useEventStore();

  useEffect(() => {
    checkAuth();
    getAllEvents();
  }, [checkAuth, getAllEvents]);

  useEffect(() => {
    if (user?.role === "admin") {
      getMessages();
      getAllUsers();
    }
  }, [getMessages, user?.role, getAllUsers]);

  if (authLoading) return <Loading />;
  return (
    <>
      <Routes>
        <Route element={<DashBoardLayout />}>
          <Route
            path="/dashboard"
            element={protectedRoutes(user, <Dashboard />, "/signin")}
          />
          <Route
            path="/manage-Events"
            element={protectedRoutes(user, <ManageEvents />, "/signin")}
          />
          <Route
            path="/notifications"
            element={protectedRoutes(user, <Notifications />, "/signin")}
          />
          <Route
            path="/manage-Users"
            element={protectedRoutes(user, <ManageUser />, "/signin")}
          />
          <Route
            path="/messages"
            element={protectedRoutes(user, <Messages />, "/signin")}
          />
          <Route
            path="/profile"
            element={protectedRoutes(user, <Profile />, "/signin")}
          />
        </Route>

        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={protectedRoutes(!user, <Signin />, "/")}
          />
          <Route
            path="/signup"
            element={protectedRoutes(!user, <Signup />, "/")}
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
