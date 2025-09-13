import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useEffect } from "react";

const Notifications = () => {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, [])
  const { userNotifications } = useAuthStore();
  return (
    <div className="flex flex-col gap-4 my-10">
      {userNotifications?.map((notification, i) => (
        <Card key={i}>
          <CardContent>
            {notification.message}
          <p className={"text-sm text-muted-foreground text-right"}>
            {new Date(notification.createdAt).toLocaleString()}
          </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Notifications;
