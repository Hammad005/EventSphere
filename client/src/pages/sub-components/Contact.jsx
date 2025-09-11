import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "@/store/useChatStore";
import { Info, Loader2, MapPin, Phone, Send } from "lucide-react";
import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const Contact = () => {
  const { sendMessage, messageLoading } = useChatStore();
  const [data, setdata] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({});

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const newError = {};
    if (!data.fullName) {
      newError.fullName = "Full name is required";
    }
    if (!data.email) {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newError.email = "Invalid email format";
    }

    if (!data.message) {
      newError.message = "Message is required";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      const res = await sendMessage(data);
      if (res?.success) {
        setdata({
          fullName: "",
          email: "",
          message: "",
        });
      }
    }
  };
  return (
    <div className="flex flex-col justify-between dark:bg-black bg-secondary lg:min-h-[calc(100vh-75px)] sticky top-[75px] w-full p-4">
      <div className="mt-4 flex flex-col gap-8">
        <h1 className="text-4xl font-serif">
          <Typewriter
            words={["Any Questions ?"]}
            loop={0}
            cursor
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSendMessage}>
          <div className="flex flex-col gap-1">
            <Input
              type={"text"}
              placeholder="Enter your full name"
              value={data.fullName}
              onChange={(e) => setdata({ ...data, fullName: e.target.value })}
            />
            {error.fullName && (
              <span className="text-xs flex items-center gap-1 justify-end">
                <Info className="size-2.5" />
                {error.fullName}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Input
              type={"text"}
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setdata({ ...data, email: e.target.value })}
            />
            {error.email && (
              <span className="text-xs flex items-center gap-1 justify-end">
                <Info className="size-2.5" />
                {error.email}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Textarea
              placeholder="Enter your message"
              className={"min-h-30 max-h-30 resize-none"}
              value={data.message}
              onChange={(e) => setdata({ ...data, message: e.target.value })}
            />
            {error.message && (
              <span className="text-xs flex items-center gap-1 justify-end">
                <Info className="size-2.5" />
                {error.message}
              </span>
            )}
          </div>
          <Button type="submit" disabled={messageLoading}>
            {messageLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Send /> Send
              </>
            )}
          </Button>
        </form>
      </div>

      <div className="flex flex-col gap-2 justify-end h-full">
        <a
          href="tel:+9221111278324"
          className="cursor-pointer flex items-center gap-2"
        >
          <Phone className="fill-foreground size-5" />
          <span className="text-lg font-semibold">(+92) 21-111 278 324</span>
        </a>

        <p className="flex gap-2 text-base">
          <MapPin className="size-9" />
          Glass Tower, Block 8 Frere Town, Karachi, 75500 Get there:
        </p>
      </div>
    </div>
  );
};

export default Contact;
