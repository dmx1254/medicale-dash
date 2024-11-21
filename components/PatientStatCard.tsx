import React from "react";
import clsx from "clsx";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: React.ReactNode;
  w: number;
  h: number;
}

const PatientStatCard = ({ type, count = 0, label, icon }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="relative flex items-center gap-4 ">
        {icon}

        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <div className="flex items-center gap-1">
        <p className="text-14-regular">{label}</p>
        {label === "Patients en ligne" && (
          <span className="flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
        )}
      </div>
    </div>
  );
};

export default PatientStatCard;
