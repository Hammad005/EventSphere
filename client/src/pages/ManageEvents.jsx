import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  CalendarPlus,
  Check,
  Edit,
  Eye,
  Trash2,
  UserPlus2,
  X,
} from "lucide-react";
import CreateEvent from "./sub-components/CreateEvent";
import { useEventStore } from "@/store/useEventStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteEvent from "@/components/DeleteEvent";
import EditEvent from "./sub-components/EditEvent";

const ManageEvents = () => {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, [])
  const events = useEventStore((state) => state.events);
  const approveEvent = useEventStore((state) => state.approveEvent);
  const eventLoading = useEventStore((state) => state.eventLoading);

  const { user, allUsers } = useAuthStore();

  const [change, setChange] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(null);

  const approveRequest = events.filter((e) => !e.approved);
  // Group filters in one place
  const eventGroups = {
    upcoming:
      user?.role === "admin"
        ? events.filter((e) => e.status === "upcoming" && e.approved)
        : events.filter(
            (e) => e.status === "upcoming" && e.organizer === user._id
          ),
    ongoing:
      user?.role === "admin"
        ? events.filter((e) => e.status === "ongoing" && e.approved)
        : events.filter(
            (e) => e.status === "ongoing" && e.organizer === user._id
          ),
    completed:
      user?.role === "admin"
        ? events.filter((e) => e.status === "completed" && e.approved)
        : events.filter(
            (e) => e.status === "completed" && e.organizer === user._id
          ),
    cancelled:
      user?.role === "admin"
        ? events.filter((e) => e.status === "cancelled" && e.approved)
        : events.filter(
            (e) => e.status === "cancelled" && e.organizer === user._id
          ),
  };

  // Store just the key
  const [filterEvents, setFilterEvents] = useState("upcoming");

  const displayedEvents = eventGroups[filterEvents];

  const labels = {
    upcoming: "Upcoming Events",
    ongoing: "Ongoing Events",
    completed: "Completed Events",
    cancelled: "Cancelled Events",
  };

  return (
    <>
      {deleteEvent && (
        <DeleteEvent
          deleteEvent={deleteEvent}
          setDeleteEvent={setDeleteEvent}
        />
      )}
      <div className="flex flex-col items-center min-h-[calc(100vh-80px)] w-full">
        {!change ? (
          <>
            {/* Create Button */}
            <div className="flex justify-end w-full mt-5">
              <Button onClick={() => setChange("create")} variant={"secondary"}>
                <CalendarPlus /> Create Events
              </Button>
            </div>

            {/* Stat Cards */}
            {user?.role === "admin" && (
              <>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full mt-5">
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

                <div className="flex items-center justify-between w-full my-5">
                  <h2 className="text-3xl font-bold w-full">
                    New Events{" "}
                    <span className="text-sm text-muted-foreground">
                      (approving requests)
                    </span>
                  </h2>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <div className="overflow-hidden rounded-md border w-full">
                    <Table>
                      <TableHeader className="bg-secondary">
                        <TableRow>
                          <TableHead>Approved</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>Fee</TableHead>
                          <TableHead>Organizer</TableHead>
                          <TableHead className={"text-center"}>
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {approveRequest.length > 0 ? (
                          approveRequest?.map((event) => {
                            const organizer =
                              event.organizer === user._id
                                ? user.name
                                : allUsers.find(
                                    (r) => r._id === event.organizer
                                  )?.name;

                            return (
                              <TableRow key={event._id}>
                                <TableCell>
                                  {event.approved ? (
                                    <Check className="text-green-500" />
                                  ) : (
                                    <X className="text-red-500" />
                                  )}
                                </TableCell>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.category}</TableCell>
                                <TableCell>
                                  {new Date(event.startDate).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  {new Date(event.endDate).toLocaleString()}
                                </TableCell>
                                <TableCell>{event.fee}</TableCell>
                                <TableCell>{organizer}</TableCell>
                                <TableCell className={"flex justify-center"}>
                                  <Button
                                    type={"button"}
                                    onClick={() => approveEvent(event._id)}
                                    disabled={eventLoading}
                                  >
                                    <Check /> Approved
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableCell className={"w-full"}>
                            <p className="text-center p-2">No event requests</p>
                          </TableCell>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </>
            )}

            <div className="flex md:flex-row flex-col gap-2 items-center justify-between w-full my-5">
              <h2 className="text-3xl font-bold w-full">
                {labels[filterEvents]}
              </h2>
              <Select value={filterEvents} onValueChange={setFilterEvents}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming Events</SelectItem>
                  <SelectItem value="ongoing">Ongoing Events</SelectItem>
                  <SelectItem value="completed">Completed Events</SelectItem>
                  <SelectItem value="cancelled">Cancelled Events</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="flex flex-col gap-2 w-full">
              <div className="overflow-hidden rounded-md border w-full">
                <Table>
                  <TableHeader className="bg-secondary">
                    <TableRow>
                      <TableHead>Approved</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Total Participants</TableHead>
                      <TableHead className={"text-center"}>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedEvents?.length > 0 ? (
                      displayedEvents?.map((event) => {
                        const organizer =
                          event.organizer === user._id
                            ? user.name
                            : allUsers.find((r) => r._id === event.organizer)
                                ?.name;

                        return (
                          <TableRow key={event._id}>
                            <TableCell>
                              {event.approved ? (
                                <Check className="text-green-500" />
                              ) : (
                                <X className="text-red-500" />
                              )}
                            </TableCell>
                            <TableCell>{event.title}</TableCell>
                            <TableCell>{event.category}</TableCell>
                            <TableCell>
                              {new Date(event.startDate).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {new Date(event.endDate).toLocaleString()}
                            </TableCell>
                            <TableCell>{event.fee}</TableCell>
                            <TableCell>{event.status}</TableCell>
                            <TableCell>{organizer}</TableCell>
                            <TableCell className="text-center">
                              {event.participants.length}
                            </TableCell>
                            <TableCell className={"flex gap-3"}>
                              <Button size={"icon"}>
                                <Eye />
                              </Button>
                              <Button size={"icon"} variant={"outline"} onClick={() => {
                                setEditEvent(event._id)
                                setChange("edit")
                              }}>
                                <Edit />
                              </Button>
                              <Button
                                size={"icon"}
                                variant={"destructive"}
                                onClick={() => {
                                  setDeleteEvent(event);
                                }}
                              >
                                <Trash2 />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableCell>
                        <p className="text-center p-2">No Event found</p>
                      </TableCell>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        ) : change === "create" ?(
          <CreateEvent setChange={setChange} />
        ) : (
          <EditEvent setChange={setChange} editEvent={editEvent} setEditEvent={setEditEvent}/>
        )}
      </div>
    </>
  );
};

export default ManageEvents;
