"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import AppointmentForm from "./forms/AppointmentForm";
import { AppointModal } from "@/types/appwrite.types";
import { getDoctorsInService } from "@/lib/actions/doctor.actions";
import { ActifRegisterDoctor } from "@/types";

const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
  phone,
}: {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment: AppointModal;
  phone: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<ActifRegisterDoctor[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(doctors);

  useEffect(() => {
    const getDoctorsCall = async () => {
      try {
        const response = await fetch("/api/doctor", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDoctors(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getDoctorsCall();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500"}`}
        >
          {type === "schedule" && "Programmer"}
          {type === "cancel" && "Annuler"}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm-max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="">
            {type === "schedule" ? "Programmer" : "Annuler"} le rendez-vous
          </DialogTitle>
          <DialogDescription>
            Veuillez remplir les détails suivants pour{" "}
            {type === "schedule" ? "Programmer" : "Annuler"} le rendez-vous
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
          phone={phone}
          doctors={doctors}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
