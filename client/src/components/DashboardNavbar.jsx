import React from "react";
import ModeToggle from "./ModeToggle";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Home} from "lucide-react";

const DashboardNavbar = () => {
  const location = useLocation();
  return (
    <>
      <nav className="w-full p-3 flex items-center justify-between sticky top-0 z-50 dark:bg-black/90 bg-secondary border-b dark:border-black border-zinc-300">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-serif tracking-wider font-bold first-letter:uppercase">
            {location.pathname.split("/")}
          </h1>
          <div className="flex gap-2">
            <Button asChild>
              <Link to={"/"}>
                <Home />
                <span className="md:inline hidden">
                Back to home
                </span>
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardNavbar;
