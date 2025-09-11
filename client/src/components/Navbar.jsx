import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import ModeToggle from "./ModeToggle";
import {
  ChartNoAxesGantt,
  CircleUser,
  Gauge,
  Loader2,
  LogIn,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import logo from "../assets/logo.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { user, signout, userLoading } = useAuthStore();
  const [open, setOpen] = useState(false);
  const navigate = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [navigate.pathname])
  
  return (
    <nav className="w-full p-3 flex items-center justify-between sticky top-0 z-50 dark:bg-secondary bg-zinc-100 border-b dark:border-black border-zinc-300">
      <div className="w-full">
        <Link to={'/'} className="flex items-center gap-2 w-fit">
          <div className="p-2 rounded-md bg-black w-12 h-12 object-contain">
            <img
              src={logo}
              alt=" logo"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif text-xl font-bold tracking-wide leading-5">
              EventSphere
            </h1>
            <p className="text-xs text-muted-foreground">
              Simplifying college event management.
            </p>
          </div>
        </Link>
      </div>
      <div className="lg:flex hidden items-center justify-between w-full">
        <Link to="/" className="uppercase font-semibold">
          Home
        </Link>
        <Link to="/about" className="uppercase font-semibold">
          About
        </Link>
        <Link to="/events" className="uppercase font-semibold">
          Events
        </Link>
        <Link to="/gallery" className="uppercase font-semibold">
          Gallery
        </Link>
      </div>

      <div className="lg:flex hidden items-center gap-2 w-full justify-end">
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

      <div className="lg:hidden flex items-center gap-2">
        <ModeToggle />
            <Button size={"icon"} onClick={() => setOpen(true)}>
              <ChartNoAxesGantt />
            </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader className={"border-b"}>
              <SheetTitle
                className={"font-serif tracking-wider text-xl leading-5"}
              >
                EventSphere
              </SheetTitle>
              <SheetDescription>
                Simplifying college event management.
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col items-center justify-center gap-12 w-full h-full">
              <Link to="/" className="uppercase font-semibold text-2xl">
                Home
              </Link>
              <Link to="/about" className="uppercase font-semibold text-2xl">
                About
              </Link>
              <Link to="/events" className="uppercase font-semibold text-2xl">
                Events
              </Link>
              <Link to="/gallery" className="uppercase font-semibold text-2xl">
                Gallery
              </Link>
            </div>
            <div className="w-full border-t p-2 flex items-center justify-between">
              <div>
                {user && (
                  <Button asChild variant={"ghost"}>
                    <Link to="/dashboard" className="flex items-center">
                      <CircleUser className="size-5" />
                      {user?.name}
                    </Link>
                  </Button>
                )}
              </div>
              {!user ? (
                <Button asChild size={"lg"}>
                  <Link to="/signin">
                    Sign in
                    <LogIn />
                  </Link>
                </Button>
              ) : (
                <Button onClick={signout} size={"icon"} disabled={userLoading}>
                  {!userLoading ? (
                    <>
                      <LogOut />
                    </>
                  ) : (
                    <Loader2 className="animate-spin" />
                  )}
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
