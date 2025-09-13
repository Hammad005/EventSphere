import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/useAuthStore";
import { useEventStore } from "@/store/useEventStore";
import { ArrowLeft, Check, Loader2, TicketCheck, X } from "lucide-react";
import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ViewEvent = ({ setChange, id, setId }) => {
  const { participateInEvent, registerLoading } = useEventStore();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { user } = useAuthStore();

  const event = useEventStore((state) => state.events);
  const filterdEvent = event?.find((ev) => ev._id === id);

  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-75px)] w-full p-8">
        <div className="flex flex-col gap-2 w-full">
          <Button
            variant={"outline"}
            size={"icon"}
            className={"mb-2"}
            onClick={() => {
              setChange(null);
              setId(null);
            }}
          >
            <ArrowLeft />
          </Button>
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
          {filterdEvent?.createdBy && (
            <p className="flex justify-between border p-1 text-end">
              <span className="text-green-500 font-bold mr-2">
                Approved By:
              </span>{" "}
              {filterdEvent?.createdBy?.name}
            </p>
          )}
          <p className="flex justify-between border p-1 text-end">
            <span className="text-green-500 font-bold mr-2">Fee:</span> Rs.{" "}
            {filterdEvent?.fee}/-
          </p>

          <div className="flex items-center justify-end w-full">
            {user && user?.role === "participant" && (
              <Button
                size={"sm"}
                className="mt-4"
                onClick={() => participateInEvent(id)}
                disabled={registerLoading}
              >
                {registerLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <TicketCheck />
                    Participate
                  </>
                )}
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between w-full my-5">
              <h2 className="text-3xl font-bold w-full">Participants</h2>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="overflow-hidden rounded-md border w-full">
                <Table>
                  <TableHeader className="bg-secondary">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Attended</TableHead>
                      <TableHead>Certificate Issued</TableHead>
                      <TableHead>Register At</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterdEvent?.participants?.length > 0 ? (
                      filterdEvent?.participants?.map((participant, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell>{participant.user.name}</TableCell>
                            <TableCell>{participant.paymentStatus}</TableCell>
                            <TableCell>
                              {participant.attended ? (
                                <Check className="text-green-500" />
                              ) : (
                                <X className="text-red-500" />
                              )}
                            </TableCell>
                            <TableCell>
                              {participant.certificateIssued ? (
                                <Check className="text-green-500" />
                              ) : (
                                <X className="text-red-500" />
                              )}
                            </TableCell>
                            <TableCell>
                              {new Date(participant.registeredAt).toLocaleString()}
                            </TableCell>
                            <TableCell></TableCell>
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
          </div>

          <div className="flex justify-center items-center w-full mt-4">
            {filterdEvent?.feedback?.length > 0 && (
              <div className="w-1/2">
                <p className="font-bold text-center mb-2">
                  Total feedbacks: {filterdEvent?.feedback?.length}
                </p>
                <Carousel>
                  <CarouselContent>
                    {filterdEvent?.feedback?.map((f, i) => (
                      <CarouselItem key={i}>
                        <Card>
                          <CardHeader>
                            <CardTitle>{f?.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>{f?.message}</p>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEvent;
