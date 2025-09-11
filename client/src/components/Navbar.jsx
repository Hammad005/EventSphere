import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import ModeToggle from "./ModeToggle";
import { Gauge, Loader2, LogIn, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Navbar = () => {
  const { user, signout, userLoading } = useAuthStore();
  return (
    <nav className="w-full p-4 flex items-center justify-between sticky top-0 z-50 dark:bg-secondary bg-zinc-100 border-b dark:border-black border-zinc-300">
      <div></div>
      <div className="lg:flex hidden items-center gap-6">
        <Link
          to="/"
          className="uppercase font-semibold hover:text-muted-foreground"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="uppercase font-semibold hover:text-muted-foreground"
        >
          About
        </Link>
        <Link
          to="/events"
          className="uppercase font-semibold hover:text-muted-foreground"
        >
          Events
        </Link>
        <Link
          to="/gallery"
          className="uppercase font-semibold hover:text-muted-foreground"
        >
          Gallery
        </Link>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {user && (
            <Button asChild size={"lg"}>
              <Link to="/dashboard">
                Dashboard
                <Gauge />
              </Link>
            </Button>
          )}
          {!user ? (
            <Button asChild size={"lg"}>
              <Link to="/signin">
                Sign in
                <LogIn />
              </Link>
            </Button>
          ) : (
            <Button onClick={signout} size={"lg"} disabled={userLoading}>
              {!userLoading ? (
                <>
                  Sign Out
                  <LogOut />
                </>
              ) : (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
