"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { SESSIONAUTH } from "@/types";

const DocteurAvatar = ({ session }: { session: SESSIONAUTH }) => {
  const [profile, setProfile] = useState<string>("");
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  //   console.log(profile)

  useEffect(() => {
    const fetchDoctor = async () => {
      setIsProfileLoading(true);
      try {
        const response = await fetch(`/api/doctor/${session?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctor");
        }
        const data = await response.json();
        // console.log(data);
        setProfile(data.profile);
        setIsProfileLoading(false);
      } catch (error) {
        console.error(error);
      }

      setIsProfileLoading(false);
    };
    fetchDoctor();
  }, [session?.id]);
  return (
    <Avatar className="mr-2 h-8 w-8">
      {isProfileLoading ? (
        <Skeleton className="h-8 w-8 rounded-full" />
      ) : (
        <AvatarImage src={profile} alt={session?.name} className="" />
      )}

      {/* <AvatarFallback>{`${session?.name.split(" ")[0][0]}${
        session?.name.split(" ")[1][0]
      }`}</AvatarFallback> */}
    </Avatar>
  );
};

export default DocteurAvatar;
