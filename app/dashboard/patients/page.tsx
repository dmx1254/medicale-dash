import React from "react";
import { columns } from "@/components/patientable/columns";
import { DataTable } from "@/components/patientable/DataTable";
import { getAllPatients } from "@/lib/actions/patient.actions";
import PatientStatCard from "@/components/PatientStatCard";

import { Users, UserCheck, TriangleAlert } from "lucide-react";

const PatientPage = async () => {
  const { patients, patientsCount, patientsBan, patientsActif } =
    await getAllPatients();
  //   console.log(allPatients);

  return (
    <div className="mx-auto flex w-full flex-col space-y-14">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Bienvenue 👋</h1>
          <p className="text-dark-700">
            Gerer et personnaliser les patients de votre choix.
          </p>
        </section>
        <section className="admin-stat">
          <PatientStatCard
            type="appointments"
            count={patientsCount}
            label="Total Patients"
            w={32}
            h={32}
            icon={<Users size={32} className="text-[#a16207]" />}
          />
          <PatientStatCard
            type="pending"
            count={patientsActif}
            label="Patients Actif"
            icon={<UserCheck size={32} className="text-[#3b82f6]" />}
            w={32}
            h={32}
          />
          <PatientStatCard
            type="cancelled"
            count={patientsBan}
            label="Patients Bannis"
            icon={<TriangleAlert size={32} className="text-[#FFD147]" />}
            w={32}
            h={32}
          />
        </section>
        <DataTable columns={columns} data={patients} />
      </main>
    </div>
  );
};

export default PatientPage;
