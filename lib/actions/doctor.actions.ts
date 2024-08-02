// import { DoctorCreating } from "@/types";
import { getActifDoctors } from "../api/doctor";
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

// export async function createDoctor(doctorData: DoctorCreating) {
//   try {
//     const response = await createNewDoctor(doctorData);
//     if (!response.user) {
//       return response;
//     }

//     revalidatePath("/dashboard/docteurs");
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }
