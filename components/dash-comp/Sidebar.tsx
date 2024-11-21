"use client";

import { sidebarInfo } from "@/types/otherTypes";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogOut, Stethoscope } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();

  const logout = async () => {
    await signOut();
  };

  return (
    <div className="admin-profile-cop h-screen max-h-screen max-md:hidden md:w-60">
      <div className="flex flex-col items-start gap-4">
        <Link href="/dashboard" className="max-md:hidden">
          <Image
            src="/assets/icons/logo-full.svg"
            height={100}
            width={100}
            alt="medicale care"
            className="mb-3 h-10 w-fit"
          />
        </Link>
        <Link href="/dashboard" className="flex self-center md:hidden">
          <Image
            src="/assets/icons/logo-icon.svg"
            height={100}
            width={100}
            alt="medicale care"
            className="mb-3 h-10 w-fit"
          />
        </Link>

        {sidebarInfo.map((profil) => (
          <Button
            key={profil.id}
            variant="ghost"
            className={clsx(
              "cursor-pointer flex items-center gap-2 text-[#abafb4] opacity-70",
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
                <span className="text-[16px] max-md:hidden">
                  {profil.title}
                </span>
              )}
            </Link>
          </Button>
        ))}
        <div className="flex flex-col items-start self-center gap-4 -ml-1">
          <Link
            href="/dashboard/dossier-medical"
            className={clsx(
              "cursor-pointer flex items-center gap-2 text-[#abafb4] opacity-70 hover:text-green-500 hover:opacity-100",
              {
                "text-green-500 opacity-90 hover:opacity-100":
                  "/dashboard/dossier-medical" === pathname,
              }
            )}
          >
            <Stethoscope />
            Dossier Médical
          </Link>
          <div className="flex flex-col items-start gap-2 ml-6 text-[#7A7C7E]">
            <button>prescriptions</button>
            <button>hey2</button>
            <button>hey3</button>
            <button>hey4</button>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        className="flex items-center gap-2 outline-none hover:text-red-500 text-[#7A7C7E]"
        onClick={logout}
      >
        <LogOut />
        <span className="max-md:hidden">Logout</span>
      </Button>
    </div>
  );
};

export default Sidebar;
