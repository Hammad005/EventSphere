import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChatStore } from "@/store/useChatStore";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Messages = () => {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, [])
  const { messages, deleteMessage, messageLoading } = useChatStore();
  const [deletingId, setSeletingId] = useState(null);

  const handleDelete = (id) => {
    setSeletingId(id);
    deleteMessage(id);
  };
  return (
    <div className="p-6 grid gap-4 min-h-[calc(100vh-80px)]">
      {messages?.map((message) => (
        <Card key={message._id} className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {message.fullName}
            </CardTitle>
            <p className="text-sm text-gray-500">{message.email}</p>

            <CardAction>
              <Button
                variant="destructive"
                size={"icon"}
                disabled={messageLoading && message._id === deletingId}
                onClick={() => handleDelete(message._id)}
              >
                {messageLoading && message._id === deletingId ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 />
                )}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-700">{message.message}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}

      {messages?.length === 0 && (
        <p className="text-center text-gray-500">No messages found</p>
      )}
    </div>
  );
};

export default Messages;
