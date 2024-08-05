import { isValidObjectId } from "mongoose";
import { AppointmentUpdate, CreateAppointmentParams } from "@/types";
import { connectDB } from "../db";
import AppointmentModel from "../models/appointment.model";
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

export async function getAllAppointmentList() {
  try {
    const allAppointmentsResult = AppointmentModel.find().sort({
      updatedAt: -1,
    });
    const scheduledCountResult = AppointmentModel.countDocuments({
      status: "scheduled",
    });
    const pendingCountResult = AppointmentModel.countDocuments({
      status: "pending",
    });

    const cancelledCountResult = AppointmentModel.countDocuments({
      status: "cancelled",
    });

    const [allAppointments, scheduledCount, pendingCount, cancelledCount] =
      await Promise.all([
        allAppointmentsResult,
        scheduledCountResult,
        pendingCountResult,
        cancelledCountResult,
      ]);

    return {
      allAppointments,
      scheduledCount,
      pendingCount,
      cancelledCount,
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
