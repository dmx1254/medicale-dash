"use server";

import { client, pusher } from "../db";

import { formatDateTime, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";
import {
  createPatientAppointment,
  deleteSingleAppointment,
  fiveRecentAppointments,
  getAllAppointmentCounts,
  getAllAppointmentList,
  getPatientApppointment,
  getUserPatientAppointment,
  updateSingleAppointment,
} from "../api/appointment";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await createPatientAppointment(appointment);
    pusher.trigger("notifications", "appointment", { message: newAppointment });
    return parseStringify(newAppointment);
  } catch (error: any) {
    console.error(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await getPatientApppointment(appointmentId);
    return parseStringify(appointment);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserAppointments = async (userId: string) => {
  try {
    const userAppointment = await getUserPatientAppointment(userId);
    return parseStringify(userAppointment);
  } catch (error: any) {
    console.error(error);
  }
};

// export const getRecentAppointmentList = async () => {
//   try {
//     const appointments = await databases.listDocuments(
//       "668ac4440030872f1ffc",
//       "668ac5130005ffa78400",
//       [Query.orderDesc("$createdAt")]
//     );

//     const initialCounts = {
//       scheduledCount: 0,
//       pendingCount: 0,
//       cancelledCount: 0,
//     };

//     const counts = (appointments.documents as Appointment[]).reduce(
//       (acc, appointment) => {
//         if (appointment.status === "scheduled") {
//           acc.scheduledCount += 1;
//         } else if (appointment.status === "pending") {
//           acc.pendingCount += 1;
//         } else if (appointment.status === "cancelled") {
//           acc.cancelledCount += 1;
//         }
//         return acc;
//       },
//       initialCounts
//     );
//     const data = {
//       totalCount: appointments.total,
//       ...counts,
//       documents: appointments.documents,
//     };
//     return parseStringify(data);
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

export const getAppointmentList = async () => {
  try {
    const appointments = await getAllAppointmentList();
    return parseStringify(appointments);
  } catch (error: any) {
    console.error(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
  phone,
}: UpdateAppointmentParams) => {
  try {
    // console.log(appointmentId, appointment);
    const updatedAppointment = await updateSingleAppointment(
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Rendez-vous introuvable");
    }

    revalidatePath("/admin");

    // Utiliser JSON.stringify et JSON.parse pour le débogage
    const updatedAppStringified = JSON.stringify(updatedAppointment);
    const updatedAppParsed = JSON.parse(updatedAppStringified);
    await sendSMSNotification(
      phone,
      type,
      updatedAppParsed.schedule,
      updatedAppParsed.primaryPhysician,
      updatedAppParsed.cancellationReason
    );
    return updatedAppParsed;
  } catch (error: any) {
    // Utiliser console.error pour une meilleure visibilité des erreurs
    console.error("Erreur lors de la mise à jour du rendez-vous:", error);
    console.error(error);
  }
};

export const deleteAppointment = async (appointmentId: string) => {
  try {
    const appointmentDeleted = await deleteSingleAppointment(appointmentId);
    revalidatePath("/admin");
    return parseStringify(appointmentDeleted);
  } catch (error: any) {
    console.error(error);
  }
};

export const sendSMSNotification = async (
  phone: string,
  type: string,
  schedule: Date,
  primaryPhysician: string,
  cancellationReason: string
) => {
  try {
    const smsMessage = `
        Bonjour, c'est MedicaleCare.${
          type === "schedule"
            ? `Votre rendez-vous a été programmé le ${
                formatDateTime(schedule!).dateTime
              } avec le Dr. ${primaryPhysician}`
            : `Nous avons le regret de vous informer que votre rendez-vous a été annulé pour la raison suivante:${cancellationReason}`
        }`;

    const messageR = await client.messages.create({
      body: smsMessage,
      to: phone,
      from: "+13374014773",
    });
    return messageR;
  } catch (error: any) {
    console.log(error);
    console.error(error);
  }
};

export const getFiveRecentAppointments = async () => {
  try {
    const fiveRecentApps = await fiveRecentAppointments();
    return parseStringify(fiveRecentApps);
  } catch (error: any) {
    console.log(error);
    console.error(error);
  }
};

export const AppointmentCounts = async () => {
  try {
    const allAppointments = await getAllAppointmentCounts();
    return parseStringify(allAppointments);
  } catch (error) {
    console.error(error);
  }
};
