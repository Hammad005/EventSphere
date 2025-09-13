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
import { Eye, EyeOff, Info, Loader2, UserRoundPlus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useAuthStore } from "@/store/useAuthStore";

const Signup = () => {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, [])
  const {signup, userLoading} = useAuthStore(); 
  const cardRef = useRef(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "participant",
    password: "",
  });
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};

    if (!data.name) {
      newError.name = "Name is required";
    }

    if (!data.email) {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newError.email = "Invalid email format";
    }

    if (!data.phone) {
      newError.phone = "Phone number is required";
    }

    if (!data.department) {
      newError.department = "Department is required";
    }

    if (!data.password) {
      newError.password = "Password is required";
    } else if (data.password.length < 6) {
      newError.password = "Password must be at least 6 characters long";
    }

    if (!confirmPass) {
      newError.confirmPass = "Confirm Password is required";
    }else if (data.password !== confirmPass) {
      newError.confirmPass = "Passwords do not match";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      signup(data);
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
      onComplete: () => navigate("/signin"),
    });
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-75px)] w-full md:px-0 p-6">
      <Card className={"md:w-1/2 w-full"} ref={cardRef}>
        <CardHeader>
          <CardTitle className={"flex items-center gap-2"}>
            <UserRoundPlus className="size-5" />
            <span>
              SignUp -{" "}
              <span className="text-muted-foreground text-xs">
                (Only for participant)
              </span>
            </span>
          </CardTitle>
          <CardDescription>SignUp and unleash your potential</CardDescription>
          <CardContent className={"flex flex-col gap-4 px-0 mt-2"}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type={"text"}
                  placeholder="Enter your full name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                {error.name && (
                  <span className="text-xs flex items-center gap-1 justify-end">
                    <Info className="size-2.5" />
                    {error.name}
                  </span>
                )}
              </div>
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
              <div className="flex gap-2 justify-between">
                <div className="flex flex-col gap-1 w-full">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    type={"number"}
                    placeholder="Enter your phone number"
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                  />
                  {error.phone && (
                    <span className="text-xs flex items-center gap-1 justify-end">
                      <Info className="size-2.5" />
                      {error.phone}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={data.department}
                    onValueChange={(e) => setData({ ...data, department: e })}
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science Department">
                        Computer Science Department
                      </SelectItem>
                      <SelectItem value="Electrical Engineering Department">
                        Electrical Engineering Department
                      </SelectItem>
                      <SelectItem value="Mechanical Engineering Department">
                        Mechanical Engineering Department
                      </SelectItem>
                      <SelectItem value="Business Administration Department">
                        Business Administration Department
                      </SelectItem>
                      <SelectItem value="Economics Department">
                        Economics Department
                      </SelectItem>
                      <SelectItem value="English Department">
                        English Department
                      </SelectItem>
                      <SelectItem value="Mathematics Department">
                        Mathematics Department
                      </SelectItem>
                      <SelectItem value="Physics Department">
                        Physics Department
                      </SelectItem>
                      <SelectItem value="Chemistry Department">
                        Chemistry Department
                      </SelectItem>
                      <SelectItem value="Biological Sciences Department">
                        Biological Sciences Department
                      </SelectItem>
                      <SelectItem value="Psychology Department">
                        Psychology Department
                      </SelectItem>
                      <SelectItem value="Sociology Department">
                        Sociology Department
                      </SelectItem>
                      <SelectItem value="Political Science Department">
                        Political Science Department
                      </SelectItem>
                      <SelectItem value="Fine Arts Department">
                        Fine Arts Department
                      </SelectItem>
                      <SelectItem value="Law Department">
                        Law Department
                      </SelectItem>
                      <SelectItem value="Medical Sciences Department">
                        Medical Sciences Department
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {error.department && (
                    <span className="text-xs flex items-center gap-1 justify-end">
                      <Info className="size-2.5" />
                      {error.department}
                    </span>
                  )}
                </div>
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

              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="Conform-passsword">Confirm Passowrd</Label>
                <div className="relative">
                  <Input
                    type={showCPass ? "text" : "password"}
                    placeholder="Enter your confirm password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                  <div className="absolute mt-4.5 top-0 right-3 transform -translate-y-1/2 z-20">
                    {!showCPass ? (
                      <Eye
                        className="size-[1.25rem] cursor-pointer text-primary"
                        onClick={() => setShowCPass(true)}
                      />
                    ) : (
                      <EyeOff
                        className="size-[1.25rem] cursor-pointer text-primary"
                        onClick={() => setShowCPass(false)}
                      />
                    )}
                  </div>
                </div>
                {error.confirmPass && (
                  <span className="text-xs flex items-center gap-1 justify-end">
                    <Info className="size-2.5" />
                    {error.confirmPass}
                  </span>
                )}
              </div>

              <Button type="submit" className={"w-full mt-3"} disabled={userLoading}>
                {
                  userLoading ? <Loader2 className="animate-spin" /> : "Signup"
                }
              </Button>

              <p className="text-xs text-center">
                Already have an account?{" "}
                <button
                type="button"
                onClick={handleNavigateToSignup}
                className="hover:underline font-semibold cursor-pointer"
                >
                  Signin
                </button>
              </p>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Signup;
