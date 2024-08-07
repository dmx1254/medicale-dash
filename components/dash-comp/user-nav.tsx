"use client";

import { useSession } from "next-auth/react";
import DocteurAvatar from "../DocteurAvatar";
import { Skeleton } from "@/components/ui/skeleton";

// import notificationSong from "@/public/song/notif.mp3";

export function UserNav() {
  const { data: session } = useSession();
  return (
    <div className="flex items-start gap-2">
      <div>
        <DocteurAvatar session={session?.user} />
      </div>
      {session ? (
        <div className="flex flex-col items-start gap-1">
          <span className="text-sm font-bold text-dark-500">
            Dr.{session?.user.name}
          </span>
          <span className="text-sm text-green-500 font-extrabold">Admin</span>
        </div>
      ) : (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[50px]" />
        </div>
      )}
    </div>
  );
}
