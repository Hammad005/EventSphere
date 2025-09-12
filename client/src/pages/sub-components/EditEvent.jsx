import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEventStore } from "@/store/useEventStore";
import { ArrowLeft, CalendarCog, Info, Loader2 } from "lucide-react";
import React, { useState } from "react";

const EditEvent = ({ setChange, editEvent }) => {
  const { events, updateEventLoading, updateEvent } = useEventStore();
  const event = events.find((event) => event._id === editEvent);

  function toDatetimeLocal(date) {
    const pad = (n) => n.toString().padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes())
    );
  }

  const [data, setData] = useState({
    title: event?.title,
    description: event?.description,
    category: event?.category,
    department: event?.department,
    venue: event?.venue,
    startDate: toDatetimeLocal(new Date(event?.startDate)),
    endDate: toDatetimeLocal(new Date(event?.endDate)),
    registrationDeadline: new Date(event?.registrationDeadline)
      .toISOString()
      .slice(0, 10), // only date
    fee: event?.fee,
  });
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};

    if (!data.title) {
      newError.title = "Title is required";
    }

    if (!data.description) {
      newError.description = "Description is required";
    }

    if (!data.category) {
      newError.category = "Category is required";
    }

    if (!data.department) {
      newError.department = "Department is required";
    }

    if (!data.venue) {
      newError.venue = "Venue is required";
    }

    if (!data.startDate) {
      newError.startDate = "Start date is required";
    }

    if (!data.endDate) {
      newError.endDate = "End date is required";
    }

    if (!data.registrationDeadline) {
      newError.registrationDeadline = "Registration deadline is required";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      updateEvent(event._id, data);
    }
  };
  
  return (
    <>
      <Card className={"md:w-1/2 w-full my-6"}>
        <CardHeader>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setChange(false)}
          >
            <ArrowLeft />
          </Button>
          <CardTitle className={"flex items-center gap-2 justify-center"}>
            <CalendarCog className="size-5" />
            Update Events
          </CardTitle>
          <CardContent className={"flex flex-col gap-4 px-0 mt-2"}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  type={"text"}
                  placeholder="Enter event title"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
                {error.title && (
                  <span className="text-xs flex items-center gap-1 justify-end">
                    <Info className="size-2.5" />
                    {error.title}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  placeholder="Enter event description"
                  value={data.description}
                  className={"min-h-30 max-h-30 resize-none"}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
                {error.description && (
                  <span className="text-xs flex items-center gap-1 justify-end">
                    <Info className="size-2.5" />
                    {error.description}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={data.category}
                  onValueChange={(e) => setData({ ...data, category: e })}
                >
                  <SelectTrigger className={"w-full"}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Caltural">Caltural</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {error.category && (
                  <span className="text-xs flex items-center gap-1 justify-end">
                    <Info className="size-2.5" />
                    {error.category}
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

              <div className="flex flex-col gap-1">
                <Label htmlFor="venue">Venue</Label>
                <Input
                  type={"text"}
                  placeholder="Enter event venue"
                  value={data.venue}
                  onChange={(e) => setData({ ...data, venue: e.target.value })}
                />
                {error.venue && (
                  <span className="text-xs flex items-center gap-1 justify-end">
                    <Info className="size-2.5" />
                    {error.venue}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  type={"datetime-local"}
                  placeholder="Enter event start date"
                  value={data.startDate}
                  onChange={(e) =>
                    setData({ ...data, startDate: e.target.value })
                  }
                />
                {error.startDate && (
                  <span className="text-xs flex items-center gap-1 justify-end">
                    <Info className="size-2.5" />
                    {error.startDate}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  type={"datetime-local"}
                  placeholder="Enter event end date"
                  value={data.endDate}
                  onChange={(e) =>
                    setData({ ...data, endDate: e.target.value })
                  }
                />
                {error.endDate && (
                  <span className="text-xs flex items-center gap-1 justify-end">
                    <Info className="size-2.5" />
                    {error.endDate}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="registrationEndDate">
                  Registration End Date
                </Label>
                <Input
                  type={"date"}
                  placeholder="Enter event registration end date"
                  value={data.registrationDeadline}
                  onChange={(e) =>
                    setData({ ...data, registrationDeadline: e.target.value })
                  }
                />
                {error.registrationDeadline && (
                  <span className="text-xs flex items-center gap-1 justify-end">
                    <Info className="size-2.5" />
                    {error.registrationDeadline}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="fee">Fee</Label>
                <Input
                  type={"number"}
                  placeholder="Enter event fee"
                  value={data.fee}
                  onChange={(e) => setData({ ...data, fee: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                className={"w-full mt-3"}
                disabled={updateEventLoading}
              >
                {updateEventLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
};

export default EditEvent;
