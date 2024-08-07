import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: React.ReactNode;
  w: number;
  h: number;
}

const PatientStatCard = ({
  type,
  count = 0,
  label,
  icon,
  w,
  h,
}: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4 ">
        {icon}
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default PatientStatCard;
