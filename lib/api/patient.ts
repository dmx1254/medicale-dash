import { isValidObjectId } from "mongoose";
import { DoctorUpdate, UserRegister } from "@/types";
import { connectDB } from "../db";
import PatientModel from "../models/patient.model";
import bcrypt from "bcrypt";
import { parseStringify } from "../utils";

import { parse, startOfDay, endOfDay, addDays, subDays } from "date-fns";

function parseDate(dateString: string): Date {
  return parse(dateString, "dd-MM-yyyy", new Date());
}

connectDB();

export async function createPatient(patient: UserRegister) {
  try {
    const isExistingUser = await PatientModel.findOne({ email: patient.email });
    if (isExistingUser)
      return {
        error: "Cet utilisateur avec cet email existe déjà",
        user: {},
        message: "",
      };

    const isPhoneExist = await PatientModel.findOne({ phone: patient.phone });
    if (isPhoneExist)
      return {
        error: "Cet utilisateur avec ce numéro de téléphone existe déjà",
        user: {},
        message: "",
      };

    const hashedPassword = await bcrypt.hash(patient.password, 10);
    const newUser = {
      ...patient,
      password: hashedPassword,
    };
    const savedUser = await PatientModel.create(newUser);
    const newuser = parseStringify(savedUser);
    return {
      error: "",
      user: newuser,
      message: "Inscription réussie ! Bienvenue parmi nous.",
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function login(phone: string, password: string) {
  return {
    phone: phone,
    password: password,
  };
}

export async function getOnePatient(userId: string) {
  try {
    const patientGeting = await PatientModel.findById(userId).select(
      "-password"
    );
    const patient = parseStringify(patientGeting);
    return patient;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function upadteEmailString(codeEmail: string, userId: string) {
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid appointment ID");
  }

  const upadtedUserEmailString = await PatientModel.findByIdAndUpdate(
    userId,
    {
      emailStringVerified: codeEmail,
    },
    {
      new: true,
    }
  );
  return upadtedUserEmailString;
}

export async function iSEmailVerified(codeVerif: string, userId: string) {
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid appointment ID");
  }

  try {
    const isUpadtedUser = await PatientModel.findById(userId);
    const isAlreadyEmailVerified = isUpadtedUser.isEmailVerified;
    if (isAlreadyEmailVerified)
      return {
        successMessage: "Votre adresse E-mail est déjà vérifié",
        errorMessage: "",
      };

    const emailString = isUpadtedUser.emailStringVerified;
    if (emailString === codeVerif) {
      const upadtedIsVerifEmail = await PatientModel.findByIdAndUpdate(
        userId,
        {
          isEmailVerified: true,
        },
        {
          new: true,
        }
      );
      return {
        successMessage: "Votre adresse E-mail a été vérifié avec succès",
        errorMessage: "",
      };
    } else {
      return {
        successMessage: "",
        errorMessage: "Le code que vous avez saisi est incorrect",
      };
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getPatients(
  patient: string,
  startDate: string,
  endDate: string,
  genre: string,
  identicationType: string,
  currentPage: number
) {
  let itemsPerPage: number = 8;
  const offset = (currentPage - 1) * itemsPerPage;

  const matchConditions: any = { role: "PATIENT" };

  if (patient && patient.trim() !== "") {
    matchConditions.name = { $regex: patient, $options: "i" };
  }

  if (genre && genre.trim() !== "") {
    matchConditions.gender = { $regex: genre, $options: "i" };
  }
  if (identicationType && identicationType.trim() !== "") {
    matchConditions.identificationType = {
      $regex: identicationType,
      $options: "i",
    };
  }

  if (startDate || endDate) {
    matchConditions.createdAt = {};

    if (startDate) {
      const parsedStartDate = parseDate(startDate);
      matchConditions.createdAt.$gte = startOfDay(parsedStartDate);
    }

    if (endDate) {
      const parsedEndDate = parseDate(endDate);
      matchConditions.createdAt.$lte = endOfDay(parsedEndDate);
    }
  }

  try {
    const totalDocuments = await PatientModel.countDocuments(matchConditions);

    const patientsFinding = PatientModel.aggregate([
      {
        $match: matchConditions,
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: offset,
      },
      {
        $limit: itemsPerPage,
      },
      {
        $project: {
          password: 0, // Exclut le champ 'password'
          identificationDocument: 0, // Exclut le champ 'identificationDocument'
        },
      },
    ]);

    const allPatientCount = PatientModel.countDocuments({
      ...matchConditions,
      isAdmin: false,
      role: "PATIENT",
    });

    const allPatientBan = PatientModel.countDocuments({
      ...matchConditions,
      isBan: true,
      isAdmin: false,
      role: "PATIENT",
    });
    const allPatientActif = PatientModel.countDocuments({
      ...matchConditions,
      isBan: false,
      isAdmin: false,
      role: "PATIENT",
    });

    const [allPatients, patientsCountAll, patientsBanAll, patientsActifAll] =
      await Promise.all([
        patientsFinding,
        allPatientCount,
        allPatientBan,
        allPatientActif,
      ]);
    const patients = JSON.parse(JSON.stringify(allPatients));
    const patientsCount = JSON.parse(JSON.stringify(patientsCountAll));
    const patientsBan = JSON.parse(JSON.stringify(patientsBanAll));
    const patientsActif = JSON.parse(JSON.stringify(patientsActifAll));
    const totalPagesGet = JSON.parse(JSON.stringify(totalDocuments));

    const totalPages = Math.ceil(totalPagesGet / itemsPerPage);

    return { patients, patientsCount, patientsBan, patientsActif, totalPages };
  } catch (error: any) {
    console.error(`Error fetching patients: ${error}`);
  }
}

export async function deleteOnePatient(patientId: string) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const patientDeleted = await PatientModel.findByIdAndDelete(patientId);
    return patientDeleted;
  } catch (error: any) {
    throw new Error(`Error to deleting patient: ${error.message}`);
  }
}

export async function BanOnePatient(patientId: string) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const patientBan = await PatientModel.findByIdAndUpdate(
      patientId,
      {
        isBan: true,
      },
      {
        new: true,
      }
    );
    return patientBan;
  } catch (error: any) {
    throw new Error(`Error to ban patient: ${error.message}`);
  }
}

export async function deBanOnePatient(patientId: string) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const patientDeban = await PatientModel.findByIdAndUpdate(
      patientId,
      {
        isBan: false,
      },
      {
        new: true,
      }
    );
    return patientDeban;
  } catch (error: any) {
    throw new Error(`Error to ban patient: ${error.message}`);
  }
}

export async function UpdatePatientMedi(
  patientId: string,
  bloodgroup: string,
  insuranceProvider: string,
  insurancePolicyNumber: string,
  allergies: string,
  primaryPhysician: string
) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const medicalPatientUpdate = await PatientModel.findByIdAndUpdate(
      patientId,
      {
        bloodgroup,
        insuranceProvider,
        insurancePolicyNumber,
        allergies,
        primaryPhysician,
      },
      {
        new: true,
      }
    );
    return medicalPatientUpdate;
  } catch (error: any) {
    throw new Error(`Error to update medicale patient: ${error.message}`);
  }
}

export async function deleteOneDoctor(patientId: string) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const doctorDeleted = await PatientModel.findByIdAndDelete(patientId);
    return doctorDeleted;
  } catch (error: any) {
    throw new Error(`Error to deleting patient: ${error.message}`);
  }
}

export async function updateOneSingleDoctor(
  patientId: string,
  doctorDataUpdate: DoctorUpdate
) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const doctorUpdated = await PatientModel.findByIdAndUpdate(
      patientId,
      doctorDataUpdate,
      {
        new: true,
      }
    );
    return doctorUpdated;
  } catch (error: any) {
    throw new Error(`Error to updating doctor: ${error.message}`);
  }
}

export async function updateSingleDoctorStatus(
  patientId: string,
  doctorStatus: boolean
) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const doctorStatusUpdated = await PatientModel.findByIdAndUpdate(
      patientId,
      {
        doctorStatus,
      },
      {
        new: true,
      }
    );
    return doctorStatusUpdated;
  } catch (error: any) {
    throw new Error(`Error to updating doctor status: ${error.message}`);
  }
}

export async function getAllPatientsCounts() {
  try {
    const totalPatients = await PatientModel.countDocuments({
      role: "PATIENT",
      isBan: false,
    });
    return totalPatients;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
