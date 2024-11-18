"use server";

import { parseStringify } from "../utils";
import {
  BanOnePatient,
  UpdatePatientMedi,
  createPatient,
  deBanOnePatient,
  deleteOneDoctor,
  deleteOnePatient,
  getAllPatientsCounts,
  getOnePatient,
  getPatients,
  login,
  updateOneSingleDoctor,
  updateSingleDoctorStatus,
} from "../api/patient";
import {
  createNewDoctor,
  getDesktopVisits,
  getDocteurAndDetails,
  getPatientsDevices,
} from "../api/doctor";
import {
  CreateUserParams,
  DoctorCreating,
  DoctorUpdate,
  UserRegister,
} from "@/types";
import { revalidatePath } from "next/cache";

export const loginUser = async (user: CreateUserParams) => {
  try {
    const { phone, password } = user;
    const response = await login(phone, password);
    // console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await getOnePatient(userId);

    return patient;
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async (patient: UserRegister) => {
  try {
    const response = await createPatient(patient);
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    throw new Error(error);
  }
};

// export const getAllPatients = async () => {
//   try {
//     const patients = await getPatients();
//     if (patients) {
//       return parseStringify(patients);
//     }
//     return {
//       patients: 0,
//       patientsCount: 0,
//       patientsBan: 0,
//       patientsActif: [],
//     };
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

export const deletePatient = async (patientId: string) => {
  try {
    const patientDeleted = await deleteOnePatient(patientId);
    revalidatePath("/dashboard/patients");
    return parseStringify(patientDeleted);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const banPatient = async (patientId: string) => {
  try {
    const patientBan = await BanOnePatient(patientId);
    revalidatePath("/dashboard/patients");
    return parseStringify(patientBan);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deBanPatient = async (patientId: string) => {
  try {
    const patientDeban = await deBanOnePatient(patientId);
    revalidatePath("/dashboard/patients");
    return parseStringify(patientDeban);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateMedicalePatient = async (
  patientId: string,
  bloodgroup: string,
  insuranceProvider: string,
  insurancePolicyNumber: string,
  allergies: string,
  primaryPhysician: string
) => {
  try {
    const medicalUpdate = await UpdatePatientMedi(
      patientId,
      bloodgroup,
      insuranceProvider,
      insurancePolicyNumber,
      allergies,
      primaryPhysician
    );
    revalidatePath("/dashboard/patients");
    return parseStringify(medicalUpdate);
  } catch (error: any) {
    throw new Error(`Error updating medicale patient: ${error.message}`);
  }
};

// DOCTORS CODE MANAGEMENTS

export async function getAllDoctors() {
  try {
    const docteursAndDetails = await getDocteurAndDetails();
    return parseStringify(docteursAndDetails);
  } catch (error) {
    console.error(error);
  }
}

export async function createDoctor(doctorData: DoctorCreating) {
  try {
    const response = await createNewDoctor(doctorData);
    if (response.error) {
      return response;
    } else {
      revalidatePath("/dashboard/docteurs");
      return response;
    }
  } catch (error) {
    console.error(error);
  }
}

export const deleteDoctor = async (patientId: string) => {
  try {
    const patientDeleted = await deleteOneDoctor(patientId);
    revalidatePath("/dashboard/docteurs");
    return parseStringify(patientDeleted);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateNewDoctor = async (
  patientId: string,
  doctorDataUpdate: DoctorUpdate
) => {
  try {
    const doctorUpdated = await updateOneSingleDoctor(
      patientId,
      doctorDataUpdate
    );
    revalidatePath("/dashboard/docteurs");
    return parseStringify(doctorUpdated);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateIsDoctorStatus = async (
  patientId: string,
  doctorStatus: boolean
) => {
  try {
    const doctorStatusUpdated = await updateSingleDoctorStatus(
      patientId,
      doctorStatus
    );
    revalidatePath("/dashboard/docteurs");
    return parseStringify(doctorStatusUpdated);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPatientCounts = async () => {
  try {
    const allPatients = await getAllPatientsCounts();
    return parseStringify(allPatients);
  } catch (error) {
    console.error(error);
  }
};

export const getPatientDevicesTypes = async () => {
  try {
    const results = await getPatientsDevices();
    return parseStringify(results);
  } catch (error) {
    console.error(error);
  }
};

export const getPatientVisit = async () => {
  try {
    const results = await getDesktopVisits();
    return parseStringify(results);
  } catch (error) {
    console.error(error);
  }
};
