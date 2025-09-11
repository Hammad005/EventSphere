import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Info, Loader2, LogIn } from "lucide-react";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useAuthStore } from "@/store/useAuthStore";

const Signin = () => {
  const {signin, userLoading} = useAuthStore();
  const cardRef = useRef(null);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};

    if (!data.email) {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newError.email = "Invalid email format";
    }

    if (!data.password) {
      newError.password = "Password is required";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      signin(data);
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      { rotationY: -90, transformOrigin: "top center", opacity: 0 },
      {
        rotationY: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );
  });

  const navigate = useNavigate();

  const handleNavigateToSignup = () => {
    gsap.to(cardRef.current, {
      rotationY: 90,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => navigate("/signup"),
    });
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-75px)] w-full md:px-0 p-6">
      <Card className={"md:w-1/2 w-full h-96 flex justify-center"} ref={cardRef}>
        <CardHeader>
          <CardTitle className={"flex items-center gap-2"}>
            <LogIn className="size-5" />
            <span>
              Sign in
            </span>
          </CardTitle>
          <CardDescription>Welcome back. Ready to explore?</CardDescription>
          <CardContent className={"flex flex-col gap-4 px-0 mt-2"}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type={"text"}
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                {error.email && (
                  <span className="text-xs flex items-center gap-1 justify-end">
                    <Info className="size-2.5" />
                    {error.email}
                  </span>
                )}
              </div>
              

              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="passsword">Passowrd</Label>
                <div className="relative">
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <div className="absolute mt-4.5 top-0 right-3 transform -translate-y-1/2 z-20">
                    {!showPass ? (
                      <Eye
                        className="size-[1.25rem] cursor-pointer text-primary"
                        onClick={() => setShowPass(true)}
                      />
                    ) : (
                      <EyeOff
                        className="size-[1.25rem] cursor-pointer text-primary"
                        onClick={() => setShowPass(false)}
                      />
                    )}
                  </div>
                </div>
                {error.password && (
                  <span className="text-xs flex items-center gap-1 justify-end">
                    <Info className="size-2.5" />
                    {error.password}
                  </span>
                )}
              </div>

              

              <Button type="submit" className={"w-full mt-3"} disabled={userLoading}>
                {
                  userLoading ? <Loader2 className="animate-spin" /> : "Signin"
                }
              </Button>

              <p className="text-xs text-center">
                Don&apos;t have an account?{" "}
                <button
                type="button"
                onClick={handleNavigateToSignup}
                className="hover:underline font-semibold cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Signin;
