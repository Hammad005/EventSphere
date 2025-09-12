import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useState } from "react";
import AddOrganizers from "./sub-components/AddOrganizers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { UserPlus2 } from "lucide-react";

const ManageUser = () => {
  const { allUsers, switchActivation, switchActivationLoading } =
    useAuthStore();

  const [change, setChange] = useState(false);

  const totalOraganizers = allUsers.filter((user) => user.role === "organizer");
  const totalParticipants = allUsers.filter(
    (user) => user.role === "participant"
  );

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] w-full">
        {!change ? (
          <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full mt-5">
              <Card className={"w-full"}>
                <CardHeader>
                  <CardTitle className="text-2xl  font-bold font-serif">
                    Total Organizers
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className={
                    "text-9xl text-end text-transparent [-webkit-text-stroke:1px_var(--foreground)] font-bold"
                  }
                >
                  {totalOraganizers.length}
                </CardContent>
              </Card>
              <Card className={"w-full"}>
                <CardHeader>
                  <CardTitle className="text-2xl  font-bold font-serif">
                    Total Participants
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className={
                    "text-9xl text-end text-transparent [-webkit-text-stroke:1px_var(--foreground)] font-bold"
                  }
                >
                  {totalParticipants.length}
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full mt-5">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex md:flex-row flex-col md:items-center justify-between mb-2 gap-2">
                  <h2 className="text-3xl font-bold">All Organizers</h2>
                  <Button onClick={() => setChange(true)}>
                    <UserPlus2 />
                    Add Organizers
                  </Button>
                </div>
                <div className="overflow-hidden rounded-md border w-full">
                  <Table>
                    <TableHeader className="bg-secondary">
                      <TableRow>
                        <TableHead>Is-Active</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Managed Events</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {totalOraganizers?.map((user) => {
                        const userIsActive = user.isActive;
                        return (
                          <TableRow>
                            <TableCell>
                              <Switch
                                checked={userIsActive}
                                onCheckedChange={() =>
                                  switchActivation(user._id)
                                }
                                disabled={switchActivationLoading}
                              />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>{user.managedEvents.length}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>


              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold">All Participants</h2>
                </div>
                <div className="overflow-hidden rounded-md border w-full">
                  <Table>
                    <TableHeader className="bg-secondary">
                      <TableRow>
                        <TableHead>Is-Active</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Enrollment Number</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Registered Events</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {totalParticipants?.map((user) => {
                        const userIsActive = user.isActive;
                        return (
                          <TableRow>
                            <TableCell>
                              <Switch
                                checked={userIsActive}
                                onCheckedChange={() =>
                                  switchActivation(user._id)
                                }
                                disabled={switchActivationLoading}
                              />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.enrollmentNumber}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>{user.registeredEvents.length}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
            </div>
          </>
        ) : (
          <AddOrganizers setChange={setChange} />
        )}
      </div>
    </>
  );
};

export default ManageUser;
