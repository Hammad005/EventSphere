import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useState } from "react";
const Profile = () => {
  const { user, updateUser, updateUserLoading } = useAuthStore();

  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    department: user.department,
  });
  return (
    <>
      <div className="flex items-center justify-center min-h-[70vh]">
        <Card className={"md:w-1/2"}>
          <CardHeader>
            <CardTitle className={'text-xl font-serif'}>My Profile Info</CardTitle>
          </CardHeader>
        <CardContent>
          <form className="grid md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type={"text"}
                placeholder={"Enter your name"}
                disabled={updateUserLoading}
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                onBlur={() => updateUser(data)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type={"text"}
                placeholder={"Enter your email"}
                disabled={updateUserLoading}
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                onBlur={() => updateUser(data)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type={"number"}
                placeholder={"Enter your phone number"}
                disabled={updateUserLoading}
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                onBlur={() => updateUser(data)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="department">Department</Label>
              <Select
                disabled={updateUserLoading}
                defaultValue={data.department}
                onValueChange={(e) => setData({ ...data, department: e }) && updateUser(data)}
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
            </div>
          </form>
        </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;
