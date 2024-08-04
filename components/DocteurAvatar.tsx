"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { SESSIONAUTH } from "@/types";

type SessionAvatar = SESSIONAUTH | undefined;

const DocteurAvatar = ({ session }: { session: SessionAvatar }) => {
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
      } catch (error) {
        console.error(error);
      }
      new Promise((resolve) => {
        setTimeout(() => {
          setIsProfileLoading(false);
        }, 500);
        resolve(undefined);
      });
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
