// import { DoctorCreating } from "@/types";
import { getActifDoctors, getActifDoctorsCount, getDoctorsWithRemoveFields } from "../api/doctor";
import { parseStringify } from "../utils";
// import { createNewDoctor, getDocteurAndDetails } from "../api/doctor";
// import { parseStringify } from "../utils";
// import { revalidatePath } from "next/cache";

export async function getDoctorsInService() {
  try {
    const actifDoctors = await getActifDoctors();
    return parseStringify(actifDoctors);
  } catch (error) {
    console.error(error);
  }
}


export async function getDoctorsWithoutField() {
  try {
    const actifDoctors = await getDoctorsWithRemoveFields();
    return parseStringify(actifDoctors);
  } catch (error) {
    console.error(error);
  }
}

export async function getDoctorsInServiceCount() {
  try {
    const actifDoctorsCount = await getActifDoctorsCount();
    return parseStringify(actifDoctorsCount);
  } catch (error) {
    console.error(error);
  }
}
