"use client";

import React, { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import clsx from "clsx";
import { sidebarInfo } from "@/types/otherTypes";
import { usePathname } from "next/navigation";

const MobileBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <span className="border-none outline-none flex md:hidden">
          <Menu size={30} />
        </span>
      </SheetTrigger>
      <SheetContent side="left" className="bg-dark-300 border-dark-500 h-full">
        <SheetHeader>
          <SheetTitle>
            <Link href="/dashboard" className="">
              <Image
                src="/assets/icons/logo-full.svg"
                height={100}
                width={100}
                alt="medicale care"
                className="mb-3 h-10 w-fit"
              />
            </Link>
          </SheetTitle>
          {/* <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription> */}
        </SheetHeader>
        <div className="flex flex-col items-start justify-between h-full pb-12">
          <div className="flex flex-col items-start gap-4">
            {sidebarInfo.map((profil) => (
              <Button
                key={profil.id}
                variant="ghost"
                onClick={() => {
                  new Promise((resolve) => {
                    setTimeout(() => {
                      setOpen(false);
                      resolve(undefined);
                    }, 1500);
                  });
                }}
                className={clsx(
                  "cursor-pointer flex items-center gap-2 text-[#7A7C7E] opacity-70",
                  {
                    "text-green-500 opacity-90 hover:opacity-100":
                      profil.slug === pathname,

                    "hover:opacity-100": profil.slug !== pathname,
                  }
                )}
                asChild
              >
                <Link href={profil.slug} className="flex items-center gap-2">
                  <profil.icon size={22} />
                  {typeof profil.icon === "string" ? (
                    <Image
                      src="/sidebar/home-lotie.svg"
                      alt={profil.title}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <span className="text-[16px]">{profil.title}</span>
                  )}
                </Link>
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            className="flex items-center gap-2 outline-none hover:text-red-500 text-[#7A7C7E]"
          >
            <LogOut />
            <span className="">Logout</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileBar;
