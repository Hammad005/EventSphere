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

const ManageUser = () => {
  const { allUsers } = useAuthStore();

  const [change, setChange] = useState(false);

  const totalOraganizers = allUsers.filter((user) => user.role === "organizer");
  const totalParticipants = allUsers.filter(
    (user) => user.role === "participant"
  );

  return (
    <>
      <div className="flex flex-col items-center min-h-[calc(100vh-80px)] w-full">
        {!change ? (
          <>
            <div className="flex md:flex-row flex-col items-center justify-between gap-8 w-full mt-5">
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

            <div className="flex md:flex-row flex-col items-center justify-between gap-8 w-full mt-5">
              <div className="flex flex-col gap-2 w-full">
              <h2 className="text-3xl font-bold">All Organizers</h2>
              <div className="overflow-hidden rounded-2xl border w-full">
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
                        onCheckedChange={(c) => console.log(c)
                        }
                        />
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.managedEvents.length}</TableCell>
                    </TableRow>
                    )})}
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
