import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Loader2, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";

const DashboardSidebar = () => {
  const { userLoading, signout } = useAuthStore();
  return (
    <aside className="flex flex-col justify-between dark:bg-secondary bg-zinc-100 border-r dark:border-black border-zinc-300 min-h-screen sticky top-0 w-full md:p-4">
      <div className="w-full lg:p-0 p-2">
        <Link to={"/"} className="flex flex-col items-center gap-2 w-full">
          <div className="p-2 rounded-md bg-black w-12 h-12 object-contain flex justify-center">
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

<div className={"md:p-0 p-2"}>
      <Button onClick={signout} disabled={userLoading} className={'w-full'}>
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
