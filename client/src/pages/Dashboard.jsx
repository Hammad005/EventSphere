import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuthStore } from "@/store/useAuthStore";
import { useEventStore } from "@/store/useEventStore";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { user, allUsers, switchActivation, switchActivationLoading } = useAuthStore();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const events = useEventStore((state) => state.events);

  const eventGroups = {
    upcoming:
      user?.role === "admin"
        ? events?.filter((e) => e.status === "upcoming" && e.approved)
        : user?.role === "organizer"
        ? events?.filter(
            (e) =>
              e.status === "upcoming" &&
              e.organizer?.toString() === user._id.toString()
          )
        : events?.filter(
            (e) =>
              e.status === "upcoming" &&
              e.approved &&
              e.participants.some(
                (p) => p.user?.toString() === user._id.toString()
              )
          ),
    ongoing:
      user?.role === "admin"
        ? events?.filter((e) => e.status === "ongoing" && e.approved)
        : user?.role === "organizer"
        ? events?.filter(
            (e) => e.status === "ongoing" && e.organizer === user._id
          )
        : events?.filter(
            (e) =>
              e.status === "ongoing" &&
              e.approved &&
              e.participants.some(
                (p) => p.user?.toString() === user._id.toString()
              )
          ),
    completed:
      user?.role === "admin"
        ? events?.filter((e) => e.status === "completed" && e.approved)
        : user?.role === "organizer"
        ? events?.filter(
            (e) => e.status === "completed" && e.organizer === user._id
          )
        : events?.filter(
            (e) =>
              e.status === "completed" &&
              e.approved &&
              e.participants.some(
                (p) => p.user?.toString() === user._id.toString()
              )
          ),
  };
  const labels = {
    upcoming: "Upcoming Events",
    ongoing: "Ongoing Events",
    completed: "Completed Events",
  };
  return (
    <>
      <div className="min-h-[calc(100vh-80px)] p-1 flex flex-col gap-4">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 w-full mt-5">
          {Object.entries(eventGroups).map(([key, arr]) => (
            <Card key={key} className="w-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold font-serif">
                  Total {labels[key]}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-7xl text-end text-transparent [-webkit-text-stroke:1px_var(--foreground)] font-bold">
                {arr.length}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 grid-cols-1 gap-8">
          <div className="lg:col-span-4  w-full">
          <Calendar
            mode="single"
            className="rounded-md border shadow-sm lg:w-full"
            captionLayout="dropdown"
          />
          </div>
          <div className="col-span-8">
            <Table>
                    <TableHeader className="bg-secondary">
                      <TableRow>
                        <TableHead>Is-Active</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Department</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allUsers?.slice(0, 10)?.map((user) => {
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
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
