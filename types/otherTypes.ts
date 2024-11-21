import { LucideIcon, Stethoscope } from "lucide-react";
import {
  UserRound,
  HeartPulse,
  Calendar,
  House,
  CalendarCheck,
  BriefcaseMedical,
  ShieldPlus,
} from "lucide-react";

type profilePerso = {
  id: string;
  title: string;
  slug: string;
  icon: LucideIcon;
};

export const profileInfo: profilePerso[] = [
  {
    id: "koaps30",
    title: "Informations Personnelles",
    slug: "informations-personnelles",
    icon: UserRound,
  },
  {
    id: "pawxd74",
    title: "Informations Medicales",
    slug: "informations-medicales",
    icon: HeartPulse,
  },

  {
    id: "zaplq25",
    title: "Mes rendez-vous",
    slug: "mes-rendez-vous",
    icon: Calendar,
  },
];

export const sidebarInfo: profilePerso[] = [
  {
    id: "koaps30",
    title: "Home",
    slug: "/dashboard",
    icon: House,
  },
  {
    id: "pawxd74",
    title: "Rendez vous",
    slug: "/dashboard/rendez-vous",
    icon: CalendarCheck,
    // HeartPulse
  },
  {
    id: "lpqza69",
    title: "Patients",
    slug: "/dashboard/patients",
    icon: HeartPulse,
  },
  {
    id: "zazlq25",
    title: "Docteurs",
    slug: "/dashboard/docteurs",
    icon: BriefcaseMedical,
  },
  {
    id: "zayga25",
    title: "Ajouter un patient",
    slug: "/dashboard/nouveau-patient",
    icon: ShieldPlus,
  },
  {
    id: "lpawv47",
    title: "Dossier médical ",
    slug: "/dashboard/dossier-medical",
    icon: Stethoscope,
  },
];



