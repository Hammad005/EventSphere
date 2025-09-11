import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { CalendarRange, Gauge, Loader2, LogOut, UserRound, UsersRound } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";

const DashboardSidebar = () => {
  const { userLoading, signout } = useAuthStore();
  const location = useLocation();
  return (
    <aside className="flex flex-col justify-between md:gap-8 dark:bg-secondary bg-zinc-100 border-r dark:border-black border-zinc-300 h-screen sticky top-0 w-full md:p-4">
      <div className="w-full lg:p-0 p-2 ">
        <Link to={"/"} className="flex flex-col items-center gap-2 w-full">
          <div className="p-2 rounded-md bg-black w-12 h-12 object-contain flex justify-center animate-bounce">
            <img
              src={logo}
              alt=" logo"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
          <div className="lg:flex hidden flex-col text-center">
            <h1 className="font-serif text-xl font-bold tracking-wide leading-5">
              EventSphere
            </h1>
            <p className="text-xs text-muted-foreground">
              Simplifying college event management.
            </p>
          </div>
        </Link>
      </div>

      <div
        className={
          "md:p-0 p-2 flex flex-col gap-6 w-full h-full"
        }
      >
        <Button
          asChild
          className={"w-full md:justify-between"}
          variant={location.pathname === "/dashboard" ? "default" : "outline"}
        >
          <Link to={"/dashboard"}>
            <Gauge />
            <span className="md:inline hidden">Dashboard</span>
          </Link>
        </Button>
        <Button
          asChild
          className={"w-full md:justify-between"}
          variant={location.pathname === "/manage-Events" ? "default" : "outline"}
        >
          <Link to={"/manage-Events"}>
            <CalendarRange />
            <span className="md:inline hidden">Manage Events</span>
          </Link>
        </Button>
        <Button
          asChild
          className={"w-full md:justify-between"}
          variant={location.pathname === "/manage-Users" ? "default" : "outline"}
        >
          <Link to={"/manage-Users"}>
            <UsersRound />
            <span className="md:inline hidden">Manage Users</span>
          </Link>
        </Button>
        <Button
          asChild
          className={"w-full md:justify-between"}
          variant={location.pathname === "/profile" ? "default" : "outline"}
        >
          <Link to={"/profile"}>
            <UserRound />
            <span className="md:inline hidden">My Profile</span>
          </Link>
        </Button>
      </div>

      <div className={"md:p-0 p-2 h-full flex items-end"}>
        <Button onClick={signout} disabled={userLoading} className={"w-full"}>
          {!userLoading ? (
            <>
              <span className="md:inline hidden">Log Out</span>
              <LogOut />
            </>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
