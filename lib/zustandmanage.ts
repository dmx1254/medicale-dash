// store/notificationStore.ts
import { create } from "zustand";
import { ActifRegisterDoctor, AppointmentResponse } from "@/types";

// Interface pour le store
interface NotificationState {
  appointmentsNotifs: AppointmentResponse[];
  totalNotif: number;
  addNotification: (notification: AppointmentResponse) => void;
}

interface Doctors {
  doctors: ActifRegisterDoctor[];
  getAllDoctorsFromZustand: (alldoctors: ActifRegisterDoctor[]) => void;
}

type CombineState = NotificationState & Doctors;

// Créez le store Zustand
const useNotificationStore = create<CombineState>((set) => ({
  appointmentsNotifs: [],
  totalNotif: 0,
  addNotification: (notification: AppointmentResponse) =>
    set((state) => {
      const newNotifications = [...state.appointmentsNotifs, notification];
      // Exécuter la notification sonore
      return {
        appointmentsNotifs: newNotifications,
        totalNotif: newNotifications.length,
      };
    }),

  doctors: [],
  getAllDoctorsFromZustand: (alldoctors: ActifRegisterDoctor[]) =>
    set(() => {
      return {
        doctors: alldoctors,
      };
    }),
}));

export default useNotificationStore;
