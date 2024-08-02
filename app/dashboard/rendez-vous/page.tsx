import StatCard from "@/components/StatCard";
import { getAppointmentList } from "@/lib/actions/appointment.actions";
import React from "react";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";

const RendezvousPage = async () => {
  //   const appointments = await getRecentAppointmentList();
  const appointments = await getAppointmentList();
  //   console.log(appointments);

  return (
    <div className="mx-auto flex w-full flex-col space-y-14">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Bienvenue 👋</h1>
          <p className="text-dark-700">
            Débuter la journée par un nouveau rendez-vous
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount}
            label="Rendez-vous programmés"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount}
            label="Rendez-vous en attente"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount}
            label="Rendez-vous annulés"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={appointments?.allAppointments} />
      </main>
    </div>
  );
};

export default RendezvousPage;
