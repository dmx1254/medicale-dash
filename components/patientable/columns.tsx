"use client";

import { ColumnDef } from "@tanstack/react-table";

import { getPrimaryPhysicianPicture } from "@/lib/utils";
import Image from "next/image";
import { Patient } from "@/types";
import DeletePatient from "../patientActtion/DeletePatient";
import UpdatePatient from "../patientActtion/UpdatePatient";
import PatientAction from "./PatientAction";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

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
      <p
        style={{
          color:
            row?.original.gender === "homme"
              ? "#a78bfa"
              : row.original.gender === "femme"
              ? "#f472b6"
              : "#22c55e",
          backgroundColor:
            row?.original.gender === "homme"
              ? "#4c1d95"
              : row.original.gender === "femme"
              ? "#831843"
              : "#14532d",
        }}
        className="status-12-semibold  capitalize status-badge"
      >
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
    accessorKey: "identificationType",
    header: "Type d'identification",
    cell: ({ row }) => (
      <p className="text-14-medium capitalize text-[#f97316] status-badge bg-[#431407]">
        {row?.original.identificationType}
      </p>
    ),
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
    cell: ({ row }) => (
      <p className="text-14-medium whitespace-nowrap">{row?.original.phone}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="">
        {row?.original.isBan ? (
          <span className="status-badge bg-yellow-900 text-yellow-500">
            Banni
          </span>
        ) : (
          <span className="status-badge bg-blue-600 text-blue-500">Actif</span>
        )}
      </div>
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
