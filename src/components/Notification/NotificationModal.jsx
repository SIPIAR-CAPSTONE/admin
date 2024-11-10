import React from "react";

import H1 from "@/components/ui/H1";
import NotificationItem from "@/components/Notification/NotificationItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function Notification({ isOpen, handleClose }) {
  if (!isOpen) return;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center w-full min-h-screen bg-black/50"
      onClick={handleOverlayClick}
    >
      <div className="relative h-full py-4 overflow-hidden bg-white md:rounded-xl dark:bg-neutral-900 md:dark:bg-neutral-700 md:min-h-96 md:h-5/6">
        <H1 className="px-6">Notification</H1>
        <Button
          size="icon"
          onClick={handleClose}
          className="absolute text-black bg-transparent shadow-none dark:hover:bg-neutral-600 dark:bg-neutral-700 hover:bg-neutral-100 right-2 top-2 dark:text-white"
        >
          <X />
        </Button>
        <ScrollArea className="h-full max-w-xl px-6 pb-10">
          <div className="pt-4">
            {TEMP_NOTIF_DATA.map((item, index) => (
              <div key={index} className="mb-8">
                <h2 className="mb-3 font-semibold">{item.title}</h2>
                <div className="space-y-6">
                  {item.data.map((data, index) => (
                    <NotificationItem
                      key={index}
                      title={data.type}
                      desc={data.desc}
                      date={data.date}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

const TEMP_NOTIF_DATA = [
  {
    title: "Today",
    data: [
      {
        type: "Alert",
        desc: "Someone needs help at Elmwood Park, 24 Oak Street",
        date: "2024-07-01T05:22:31.269Z",
      },
      {
        type: "Alert",
        desc: "Someone needs help at Pine Hill Village, 5 Pinehurst Drive",
        date: "2024-07-01T05:22:31.269Z",
      },
    ],
  },
  {
    title: "Yesterday",
    data: [
      {
        type: "Alert",
        desc: "Someone needs help at Sunset Bay, 36 Sunset Boulevard",
        date: "2024-07-01T05:22:31.269Z",
      },
      {
        type: "Alert",
        desc: "Someone needs help at Abellanosa Cedar Valley, 8 Cedar Grove",
        date: "2024-07-01T05:22:31.269Z",
      },
      {
        type: "Alert",
        desc: "Someone needs help at Maple Grove, 15 Maple Lane",
        date: "2024-07-01T05:22:31.269Z",
      },
      {
        type: "Alert",
        desc: "Someone needs help at Brookside, 42 Brookview Road",
        date: "2024-07-01T05:22:31.269Z",
      },
      {
        type: "Alert",
        desc: "Someone needs help at Maple Grove, 15 Maple Lane",
        date: "2024-07-01T05:22:31.269Z",
      },
      {
        type: "Alert",
        desc: "Someone needs help at Brookside, 42 Brookview Road",
        date: "2024-07-01T05:22:31.269Z",
      },
    ],
  },
  {
    title: "Past",
    data: [
      {
        type: "Account",
        desc: "Account successfully verified",
        date: "2024-07-01T05:22:31.269Z",
      },
      {
        type: "Greetings",
        desc: "Welcome to SIPIAR",
        date: "2024-07-01T05:22:31.269Z",
      },
    ],
  },
];
