import { isValidObjectId } from "mongoose";
import { DoctorCreating, UserRegister } from "@/types";
import { connectDB } from "../db";
import PatientModel from "../models/patient.model";
import bcrypt from "bcrypt";
import { parseStringify } from "../utils";
connectDB();

export async function getDocteurAndDetails() {
  try {
    const allDoctorsFind = PatientModel.find({ role: "DOCTOR" });

    const allDoctorsCountFind = PatientModel.countDocuments({ role: "DOCTOR" });

    const docteursInServiceCountFind = PatientModel.countDocuments({
      role: "DOCTOR",
      doctorStatus: true,
    });
    const docteursOutServiceCountFind = PatientModel.countDocuments({
      role: "DOCTOR",
      doctorStatus: false,
    });

    const [
      allDoctors,
      allDoctorsCount,
      docteursInServiceCount,
      docteursOutServiceCount,
    ] = await Promise.all([
      allDoctorsFind,
      allDoctorsCountFind,
      docteursInServiceCountFind,
      docteursOutServiceCountFind,
    ]);
    return {
      allDoctors,
      allDoctorsCount,
      docteursInServiceCount,
      docteursOutServiceCount,
    };
  } catch (error: any) {
    throw new Error(`Error to find doctors: ${error.message}`);
  }
}

export async function createNewDoctor(doctorData: DoctorCreating) {
  try {
    const isDocteurExist = await PatientModel.findOne({
      phone: doctorData.phone,
    });
    if (isDocteurExist)
      return {
        error: "Ce docteur avec ce numéro existe déjà",
        user: {},
        message: "",
      };

    const hashedPassword = await bcrypt.hash(doctorData.password, 10);
    const doctorCreated = {
      ...doctorData,
      gender: "autre",
      password: hashedPassword,
    };
    const newDoctor = await PatientModel.create(doctorCreated);
    const doctor = parseStringify(newDoctor);
    return {
      error: "",
      user: doctor,
      message: "Docteur créé avec succès",
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getActifDoctors() {
  try {
    const isActifDoctors = await PatientModel.find({
      role: "DOCTOR",
      doctorStatus: true,
    })
      .select("_id")
      .select("name")
      .select("speciality")
      .select("profile")
      .select("createdAt")
      .select("updatedAt");
    return isActifDoctors;
  } catch (error: any) {
    throw new Error(error);
  }
}