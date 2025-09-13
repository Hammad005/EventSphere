import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useEventStore } from "@/store/useEventStore";
import { TicketCheck } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleEvent = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { id } = useParams();
  const {user} = useAuthStore();

  const event = useEventStore((state) => state.events);
  const filterdEvent = event?.find((ev) => ev._id === id);
  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-75px)] w-full p-8">
        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 w-full justify-items-center">
            {filterdEvent?.medias?.map((src, index) => (
              <img
                key={index}
                src={src.mediaUrl}
                alt={`Gallery ${index}`}
                className="w-full  md:h-50 h-30 object-cover rounded-lg border border-zinc-300 transition-transform duration-300 hover:scale-105"
              />
            ))}
          </div>

          <h2 className="md:text-6xl text-3xl font-serif">
            {filterdEvent?.title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {filterdEvent?.description}
          </p>
          <p className="flex justify-between border p-1 text-end">
            <span className="text-green-500 font-bold mr-2">Department:</span>{" "}
            {filterdEvent?.department}
          </p>
          <p className="flex justify-between border p-1 text-end">
            <span className="text-green-500 font-bold mr-2">Venue:</span>{" "}
            {filterdEvent?.venue}
          </p>
          <p className="flex justify-between border p-1 text-end">
            <span className="text-green-500 font-bold mr-2">Start:</span>{" "}
            {new Date(filterdEvent?.startDate).toLocaleString()}
          </p>
          <p className="flex justify-between border p-1 text-end">
            <span className="text-green-500 font-bold mr-2">End:</span>{" "}
            {new Date(filterdEvent?.startDate).toLocaleString()}
          </p>
          <p className="flex justify-between border p-1 text-end">
            <span className="text-green-500 font-bold mr-2">Reg End:</span>{" "}
            {new Date(filterdEvent?.registrationDeadline).toDateString()}
          </p>
          <p className="flex justify-between border p-1 text-end">
            <span className="text-green-500 font-bold mr-2">Status:</span>{" "}
            {filterdEvent?.status}
          </p>
          <p className="flex justify-between border p-1 text-end">
            <span className="text-green-500 font-bold mr-2">Organizer:</span>{" "}
            {filterdEvent?.organizer?.name}
          </p>
          {filterdEvent?.createdBy && <p className="flex justify-between border p-1 text-end">
            <span className="text-green-500 font-bold mr-2">Approved By:</span>{" "}
            {filterdEvent?.createdBy?.name}
          </p>}
          <p className="flex justify-between border p-1 text-end">
            <span className="text-green-500 font-bold mr-2">Fee:</span> Rs.{" "}
            {filterdEvent?.fee}/-
          </p>

          <div className="flex items-center justify-center w-full">
            {
            user && <Button className="w-1/2 mt-4">
              <TicketCheck />
              Participate
            </Button>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleEvent;
