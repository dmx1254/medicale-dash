import { ChartLegend } from "@/components/ui/chart";
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

export const dateFrToConvert = (date: Date | undefined) => {
  let dateToConvert;
  if (date) {
    const convertedDate = new Date(date).toLocaleDateString("fr-Fr", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    });
    dateToConvert = convertedDate;
  }

  return dateToConvert;
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

export const options = {
  method: "POST",
  hostname: process.env.INFOBIB_BASE_URL,
  path: "/sms/2/text/advanced",
  headers: {
    Authorization: process.env.INFOBIB_API_KEY,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  maxRedirects: 20,
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const customFilterDate = (date: Date) => {
  const convertedDate = new Date(date).toLocaleDateString("fr-Fr", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return convertedDate;
};

export const convertDateForSearchParams = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JS
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
};

export const pagination = (currentPage: number, totalPages: number) => {
  if (currentPage <= 7 && totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage > totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const chooseRandomColor = (): string => {
  const randomColors = [
    "rgba(2, 84, 11, 0.6)", // #02540b
    "rgba(6, 22, 195, 0.6)", // #0616c3
    "rgba(76, 19, 151, 0.6)", // #4c1397
    "rgba(217, 108, 109, 0.6)", // #d96c6d
    "rgba(54, 145, 46, 0.6)", // #36912e
    "rgba(235, 0, 101, 0.6)", // #eb0065
    "rgba(34, 166, 58, 0.6)", // #22a63a
    "rgba(187, 249, 68, 0.6)", // #bbf944
    "rgba(221, 115, 12, 0.6)", // #dd730c
    "rgba(59, 18, 73, 0.6)", // #3b1249
    "rgba(30, 97, 215, 0.6)", // #1e61d7
    "rgba(244, 157, 46, 0.6)", // #f49d2e
    "rgba(232, 154, 68, 0.6)", // #e89a44
    "rgba(191, 27, 254, 0.6)", // #bf1bfe
    "rgba(222, 8, 178, 0.6)", // #de08b2
    "rgba(105, 2, 249, 0.6)", // #6902f9
    "rgba(73, 191, 186, 0.6)", // #49bfba
    "rgba(73, 123, 72, 0.6)", // #497b48
  ];

  const iterate = Math.floor(Math.random() * randomColors.length);
  return randomColors[iterate];
};

export interface ChartLegendDataType {
  month: string;
  desktop: number;
  mobile: number;
}


export interface ChartDesktopType {
  desktop: number;
  month: string;
  fill: string;
}


export const formatPhoneNumberOrange = (phone: string): string => {
  return `tel:\\+${phone.replace("+", "")}`;
};
