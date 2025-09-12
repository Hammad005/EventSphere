import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowLeft, Eye, EyeOff, Info, Loader2, UserPlus2 } from 'lucide-react';
import React, { useRef, useState } from 'react'

const AddOrganizers = ({setChange}) => {
  const {createOrganizer, createOrganizerLoading} = useAuthStore(); 
    const cardRef = useRef(null);
    const [data, setData] = useState({
      name: "",
      email: "",
      phone: "",
      department: "",
      role: "organizer",
      password: "",
    });
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [showCPass, setShowCPass] = useState(false);
  
    const handleSubmit = async(e) => {
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
        const res = await createOrganizer(data);
        if (res?.success) {
          setData({
            name: "",
            email: "",
            phone: "",
            department: "",
            role: "organizer",
            password: "",
          });
          setConfirmPass("");
          setError({});
        }
      }
    };
  return (
    <>
    <Card className={"md:w-1/2 w-full my-6"} ref={cardRef}>
        <CardHeader>
          <Button size={"icon"} variant={"ghost"} onClick={() => setChange(false)}>
            <ArrowLeft/>
          </Button>
          <CardTitle className={"flex items-center gap-2 justify-center"}>
            <UserPlus2 className="size-5" />
              Add Organizers
          </CardTitle>
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

              <Button type="submit" className={"w-full mt-3"} disabled={createOrganizerLoading}>
                {
                  createOrganizerLoading ? <Loader2 className="animate-spin" /> : "Add"
                }
              </Button>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  )
}

export default AddOrganizers