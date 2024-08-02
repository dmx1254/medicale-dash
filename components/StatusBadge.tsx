import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

// @ts-ignore
const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-yellow-900": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("status-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-yellow-500": status === "pending",
          "text-red-500": status === "cancelled",
        })}
      >
        {status === "pending" && "En attente"}
        {status === "scheduled" && "Programmé"}
        {status === "cancelled" && "Annulé"}
      </p>
    </div>
  );
};

export default StatusBadge;
