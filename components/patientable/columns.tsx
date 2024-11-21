"use client";

import { ColumnDef } from "@tanstack/react-table";

import { chooseRandomColor, cn, getPrimaryPhysicianPicture } from "@/lib/utils";
import Image from "next/image";
import { Patient } from "@/types";
import DeletePatient from "../patientActtion/DeletePatient";
import UpdatePatient from "../patientActtion/UpdatePatient";
import PatientAction from "./PatientAction";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";
import PhoneNumberDisplay from "../phone-number-display";

export const columns: ColumnDef<Patient>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row?.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <p className="text-14-medium">{row.getValue("name")}</p>,
  },
  // {
  //   accessorKey: "phone",
  //   header: "Téléphone",
  //   cell: ({ row }) => <p className="text-14-medium">{row?.original.phone}</p>,
  // },
  {
    accessorKey: "gender",
    header: "Genre",
    cell: ({ row }) => (
      <p className="status-12-semibold  capitalize status-badge">
        {row?.original.gender}
      </p>
    ),
  },
  {
    accessorKey: "occupation",
    header: "Profession",
    cell: ({ row }) => (
      <p className="text-14-medium capitalize">{row?.original.occupation}</p>
    ),
  },

  {
    accessorKey: "phone",
    header: "Téléphone",
    cell: ({ row }) => {
      return <PhoneNumberDisplay phoneNumber={row?.original.phone} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={cn(
          "px-2 py-1 text-xs font-medium",
          row?.original.online
            ? "bg-green-900 text-green-200"
            : "bg-red-900 text-red-200"
        )}
      >
        {row?.original.online ? (
          <>
            <span className="mr-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            En ligne
          </>
        ) : (
          <>
            <span className="mr-1.5 flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            Hors ligne
          </>
        )}
      </Badge>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: () => <div className="text-left">Docteur</div>,
    cell: ({ row }) => {
      const doctor = getPrimaryPhysicianPicture(row?.original.primaryPhysician);
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor ? doctor.image : ""}
            alt={doctor ? doctor.name : ""}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1 max-xl:ml-4">
          <div className="flex items-center gap-3">
            <DeletePatient id={data._id} />
            <UpdatePatient data={data} />
          </div>
          {/* <AppointmentModal
            type="schedule"
            patientId={data?.patientId}
            userId={data?.userId}
            phone={data?.phone}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            patientId={data?.patientId}
            userId={data?.userId}
            appointment={data}
            phone={data?.phone}
          /> */}

          <PatientAction data={data} />
        </div>
      );
    },
  },
];
