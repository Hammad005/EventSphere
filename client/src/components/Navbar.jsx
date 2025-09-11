import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import ModeToggle from "./ModeToggle";
import { Gauge, LogIn } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full p-4 flex items-center justify-between sticky top-0 z-50 dark:bg-secondary bg-zinc-100 border-b dark:border-black border-zinc-300">
      <div></div>
      <div className="lg:flex hidden items-center gap-6">
        <Link to="/" className="uppercase font-semibold hover:text-muted-foreground">Home</Link>
        <Link to="/about" className="uppercase font-semibold hover:text-muted-foreground">About</Link>
        <Link to="/events" className="uppercase font-semibold hover:text-muted-foreground">Events</Link>
        <Link to="/gallery" className="uppercase font-semibold hover:text-muted-foreground">Gallery</Link>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild size={"lg"}>
            <Link to="/dashboard">
            Dashboard
            <Gauge/>
            </Link>
          </Button>
          <Button asChild size={"lg"}>
            <Link to="/signin">
            Sign in
            <LogIn/>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
