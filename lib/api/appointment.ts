import { isValidObjectId } from "mongoose";
import { AppointmentUpdate, CreateAppointmentParams } from "@/types";
import { connectDB } from "../db";
import AppointmentModel from "../models/appointment.model";

import { parse, startOfDay, endOfDay, addDays, subDays } from "date-fns";

function parseDate(dateString: string): Date {
  return parse(dateString, "dd-MM-yyyy", new Date());
}

connectDB();

export async function createPatientAppointment(
  appointment: CreateAppointmentParams
) {
  try {
    const newAppointment = await AppointmentModel.create(appointment);
    return newAppointment;
  } catch (error) {
    console.log(error);
  }
}

export async function getPatientApppointment(appointmentId: string) {
  if (!isValidObjectId(appointmentId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const appointment = await AppointmentModel.findById(appointmentId).sort({
      createdAt: -1,
    });
    return appointment;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPatientAppointment(userId: string) {
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid user ID");
  }
  try {
    const usersAppointment = await AppointmentModel.find({ userId }).sort({
      updatedAt: -1,
    });
    return usersAppointment;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAppointmentList(
  patient: string,
  startDate: string,
  endDate: string,
  status: string,
  doctor: string,
  currentPage: number
) {
  let itemsPerPage: number = 8;
  const offset = (currentPage - 1) * itemsPerPage;

  const matchConditions: any = {};

  if (patient && patient.trim() !== "") {
    matchConditions.name = { $regex: patient, $options: "i" };
  }

  if (status && status.trim() !== "") {
    matchConditions.status = { $regex: status, $options: "i" };
  }
  if (doctor && doctor.trim() !== "") {
    matchConditions.primaryPhysician = { $regex: doctor, $options: "i" };
  }

  if (startDate || endDate) {
    matchConditions.schedule = {};

    if (startDate) {
      const parsedStartDate = parseDate(startDate);
      matchConditions.schedule.$gte = startOfDay(parsedStartDate);
    }

    if (endDate) {
      const parsedEndDate = parseDate(endDate);
      matchConditions.schedule.$lte = endOfDay(parsedEndDate);
    }
  }

  // console.log(startDate);
  // console.log(endDate);
  // console.log(JSON.stringify(matchConditions, null, 2));

  try {
    const totalDocuments = await AppointmentModel.countDocuments(
      matchConditions
    );

    const allAppointmentsResult = AppointmentModel.aggregate([
      {
        $match: matchConditions,
      },
      {
        $sort: { schedule: -1 },
      },
      {
        $skip: offset,
      },
      {
        $limit: itemsPerPage,
      },
    ]);

    const scheduledCountResult = AppointmentModel.countDocuments({
      ...matchConditions,
      status: "scheduled",
    });
    const pendingCountResult = AppointmentModel.countDocuments({
      ...matchConditions,
      status: "pending",
    });

    const cancelledCountResult = AppointmentModel.countDocuments({
      ...matchConditions,
      status: "cancelled",
    });

    // const scheduledCountResultTest = AppointmentModel.countDocuments(
    //   {
    //     ...matchConditions,
    //     status: "scheduled",
    //   },
    //   {
    //     $sort: { schedule: -1 },
    //   },
    //   {
    //     $skip: offset,
    //   },
    //   {
    //     $limit: itemsPerPage,
    //   }
    // );

    const [appointments, scheduledCountPa, pendingCountPa, cancelledCountPa] =
      await Promise.all([
        allAppointmentsResult,
        scheduledCountResult,
        pendingCountResult,
        cancelledCountResult,
      ]);

    const allAppointments = JSON.parse(JSON.stringify(appointments));
    const scheduledCount = JSON.parse(JSON.stringify(scheduledCountPa));
    const pendingCount = JSON.parse(JSON.stringify(pendingCountPa));
    const cancelledCount = JSON.parse(JSON.stringify(cancelledCountPa));
    const totalPagesGet = JSON.parse(JSON.stringify(totalDocuments));

    const totalPages = Math.ceil(totalPagesGet / itemsPerPage);

    return {
      allAppointments,
      scheduledCount,
      pendingCount,
      cancelledCount,
      totalPages,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateSingleAppointment(
  appointmentId: string,
  appointment: AppointmentUpdate
) {
  if (!isValidObjectId(appointmentId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        primaryPhysician: appointment.primaryPhysician,
        schedule: appointment.schedule,
        status: appointment.status,
        cancellationReason: appointment.cancellationReason,
      },
      {
        new: true,
      }
    );
    return updatedAppointment;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteSingleAppointment(appointmentId: string) {
  if (!isValidObjectId(appointmentId)) {
    throw new Error("Invalid appointment ID");
  }

  try {
    const appointmentDel = await AppointmentModel.findByIdAndDelete(
      appointmentId
    );
    return appointmentDel;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fiveRecentAppointments() {
  try {
    const recentFiveAppointment = await AppointmentModel.find()
      .sort({ updatedAt: -1 })
      .limit(5);

    return recentFiveAppointment;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllAppointmentCounts() {
  try {
    const totalAppointments = await AppointmentModel.countDocuments({});
    return totalAppointments;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
