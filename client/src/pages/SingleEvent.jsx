import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEventStore } from "@/store/useEventStore";
import React from "react";
import { useParams } from "react-router-dom";

const SingleEvent = () => {
  const { id } = useParams();

  const event = useEventStore((state) => state.events);
  const filterdEvent = event.find((ev) => ev._id === id);
  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-75px)] w-full px-8">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-6xl font-serif">{filterdEvent.title}</h2>
          <p className="text-muted-foreground mb-6">{filterdEvent.description}</p>
          <p className="flex justify-between border p-1">
            <span className="text-green-500 font-bold mr-2">Department:</span>{" "}
            {filterdEvent.department}
          </p>
          <p className="flex justify-between border p-1">
            <span className="text-green-500 font-bold mr-2">Venue:</span>{" "}
            {filterdEvent.venue}
          </p>
          <p className="flex justify-between border p-1">
            <span className="text-green-500 font-bold mr-2">Start:</span>{" "}
            {new Date(filterdEvent.startDate).toLocaleString()}
          </p>
          <p className="flex justify-between border p-1">
            <span className="text-green-500 font-bold mr-2">End:</span>{" "}
            {new Date(filterdEvent.startDate).toLocaleString()}
          </p>
          <p className="flex justify-between border p-1">
            <span className="text-green-500 font-bold mr-2">Reg End:</span>{" "}
            {new Date(filterdEvent.registrationDeadline).toDateString()}
          </p>
          <p className="flex justify-between border p-1">
            <span className="text-green-500 font-bold mr-2">Fee:</span> Rs.{" "}
            {filterdEvent.fee}/-
          </p>
          <p className="flex justify-between border p-1">
            <span className="text-green-500 font-bold mr-2">Status:</span>{" "}
            {filterdEvent.status}
          </p>
          <p className="flex justify-between border p-1">
            <span className="text-green-500 font-bold mr-2">Organizer:</span>{" "}
            {filterdEvent.organizer.name}
          </p>
        </div>
      </div>
    </>
  );
};

export default SingleEvent;
