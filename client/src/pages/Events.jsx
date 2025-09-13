import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEventStore } from "@/store/useEventStore";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";

const Events = () => {
  const events = useEventStore((state) => state.events);

  // states for filters
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [maxFee, setMaxFee] = useState("");

  // unique values for dropdowns
  const categories = ["all", ...new Set(events.map((ev) => ev.category))];
  const statuses = ["all", ...new Set(events.map((ev) => ev.status))];

  // filtering logic
  const filteredEvents = events.filter((ev) => {
    const matchCategory = category === "all" || ev.category === category;
    const matchStatus = status === "all" || ev.status === status;
    const matchFee = !maxFee || ev.fee <= parseInt(maxFee);
    return matchCategory && matchStatus && matchFee;
  });

  return (
    <div className="p-6">
      <h2 className="text-6xl font-bold mb-8 text-center font-serif">
        Events
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Category Filter */}
        <div className="w-full flex flex-col gap-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={(val) => setCategory(val)}>
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat, i) => (
              <SelectItem key={i} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>

        {/* Status Filter */}
        <div className="w-full flex flex-col gap-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={(val) => setStatus(val)}>
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((st, i) => (
              <SelectItem key={i} value={st}>
                {st.charAt(0).toUpperCase() + st.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>

        {/* Fee Filter */}
        <div className="w-full flex flex-col gap-2">
        <Label htmlFor="maxFee">Max Fee</Label>
        <Input
          type="number"
          value={maxFee}
          onChange={(e) => setMaxFee(e.target.value)}
          placeholder="Max Fee"
          className="w-full "
        />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents?.map((ev) => (
          <Card key={ev._id} className="overflow-hidden">
            <div className="w-full h-64 overflow-hidden -mt-10 group relative">
              <img
                src={ev.medias[0].mediaUrl}
                alt={ev.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{ev.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <p>{ev.description}</p>
                <p className="flex justify-between border p-1">
                  <span className="text-green-500 font-bold mr-2">Category:</span> {ev.category}
                </p>
                <p className="flex justify-between border p-1">
                  <span className="text-green-500 font-bold mr-2">Status:</span> {ev.status}
                </p>
                <p className="flex justify-between border p-1">
                  <span className="text-green-500 font-bold mr-2">Start:</span>{" "}
                  {new Date(ev.startDate).toLocaleString()}
                </p>
                <p className="flex justify-between border p-1">
                  <span className="text-green-500 font-bold mr-2">End:</span>{" "}
                  {new Date(ev.endDate).toLocaleString()}
                </p>
                <p className="flex justify-between border p-1">
                  <span className="text-green-500 font-bold mr-2">Reg End:</span>{" "}
                  {new Date(ev.registrationDeadline).toDateString()}
                </p>
                <p className="flex justify-between border p-1">
                  <span className="text-green-500 font-bold mr-2">Fee:</span> Rs. {ev.fee}/-
                </p>
                <Button asChild>
                  <Link to={`/event/${ev._id}`}>
                    <Eye />
                    View Event
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
