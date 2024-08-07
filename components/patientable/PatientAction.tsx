"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { Patient } from "@/types";
import { banPatient, deBanPatient } from "@/lib/actions/patient.actions";
import PatientPDF from "../pdf/PatientPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const PatientAction = ({ data }: {data: Patient}) => {
  const [open, setOpen] = useState<boolean>(false);
  //   console.log(data)

  const handleBanPatient = async (patientId: string) => {
    try {
      const isbanPatient = await banPatient(patientId);
      if (isbanPatient) {
        toast.success(
          `Le patient ${isbanPatient.name} à été banni avec succès`,
          {
            style: {
              color: "#22c55e",
              background: "#0D0F10",
              border: "1px solid #363A3D",
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDebanPatient = async (patientId: string) => {
    try {
      const isbanPatient = await deBanPatient(patientId);
      if (isbanPatient) {
        toast.success(
          `Le patient ${isbanPatient.name} à été Débloqué avec succès`,
          {
            style: {
              color: "#22c55e",
              background: "#0D0F10",
              border: "1px solid #363A3D",
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0 border-none outline-none transition-all hover:opacity-80">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-5 w-8 mt-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-dark-300 z-50 border-dark-500 shadow-lg"
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer transition-transform hover:opacity-80"
            onClick={() => {
              navigator.clipboard.writeText(data.phone);
              toast.success("Numéro de téléphone copié dans la presse papier", {
                style: {
                  color: "#22c55e",
                  background: "#0D0F10",
                  border: "1px solid #363A3D",
                },
              });
            }}
          >
            Copier le téléphone
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {data.isBan ? (
            <DropdownMenuItem
              className="cursor-pointer transition-all hover:opacity-80"
              onClick={() => handleDebanPatient(data._id)}
            >
              Réactiver l'accès
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer transition-all hover:opacity-80"
              onClick={() => handleBanPatient(data._id)}
            >
              Bannir
            </DropdownMenuItem>
          )}

          <button className="cursor-pointer mx-2 text-sm border-none outline-none">
            <PDFDownloadLink
              document={<PatientPDF patient={data} />}
              fileName={`patient_fiche_${data?._id}.pdf`}
              className="text-white transition-all hover:opacity-80"
            >
              {({ loading }) =>
                loading
                  ? "Téléchargement en cours..."
                  : "Télécharger le fichier"
              }
            </PDFDownloadLink>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PatientAction;
