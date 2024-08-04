"use client";

import { useSession } from "next-auth/react";
import DocteurAvatar from "../DocteurAvatar";

// import notificationSong from "@/public/song/notif.mp3";

export function UserNav() {
  const { data: session, status } = useSession();
  return (
    <div className="flex items-start gap-2">
      <div>
        <DocteurAvatar session={session?.user} />
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-sm font-bold text-dark-500">
          Dr.{session?.user.name}
        </span>
        <span className="text-sm text-green-500 font-extrabold">Admin</span>
      </div>
    </div>
  );
}
