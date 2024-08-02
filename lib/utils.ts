import { Doctors } from "@/constants";
import { Doc, SESSIONAUTH } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleDateString(
    "fr-FR",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleDateString(
    "fr-FR",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleDateString(
    "fr-FR",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleDateString(
    "fr-FR",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string; // Cast result to string
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const getPrimaryPhysicianPicture = (doctorName: string) => {
  const doctor = Doctors.find((doc: Doc) => doc.name === doctorName);

  if (doctor) {
    return doctor;
  }
};

export function generateVerificationCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

export const dateFrToConvert = (date: Date) => {
  const convertedDate = new Date(date).toLocaleDateString("fr-Fr", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  });
  return convertedDate;
};

// export async function getSessionAndRedirect(session: SESSIONAUTH) {
//   if (session) {
//     if (session.role === "DOCTOR") {
//       redirect("/dashboard");
//     } else if (session.role === "PATIENT") {
//       redirect(`/patient/${session.id}/profile#informations-personnelles`);
//     } else {
//       redirect("/");
//     }
//   } else {
//     redirect("/");
//   }
// }
