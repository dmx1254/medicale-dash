import StatCard from "@/components/StatCard";
import React, { Suspense } from "react";
// import { getAppointmentList } from "@/lib/actions/appointment.actions";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getAllAppointmentList } from "@/lib/api/appointment";
import LatestInvoicesSkeleton from "@/components/skelettons/skeletons";
import DateFilter from "@/components/DateFilter";
import ScheduleSearch from "@/components/ScheduleSearch";
import { getDoctorsWithoutField } from "@/lib/actions/doctor.actions";
import { AppointmentResponse } from "@/types";

const RendezvousPage = async ({
  searchParams,
}: {
  searchParams?: {
    patient?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    doctor?: string;
    page?: number;
  };
}) => {
  //   const appointments = await getRecentAppointmentList();
  const patient = searchParams?.patient || "";
  const startDate = searchParams?.startDate || "";
  const endDate = searchParams?.endDate || "";
  const status = searchParams?.status || "";
  const doctor = searchParams?.doctor || "";
  const currentPageStr = searchParams?.page || 1;
  const currentPage = Number(currentPageStr);
  const appointments = await getAllAppointmentList(
    patient,
    startDate,
    endDate,
    status,
    doctor,
    currentPage
  );
  const doctors = await getDoctorsWithoutField();
  // console.log(appointments.allAppointments);
  // console.log("When i change page");
  // console.log("Start date: " + startDate);
  // const scheduledCount = appointments.allAppointments.filter(
  //   (app: AppointmentResponse) => app.status === "scheduled"
  // );
  // const pendingCount = appointments.allAppointments.filter(
  //   (app: AppointmentResponse) => app.status === "pending"
  // );
  // const cancelledCount = appointments.allAppointments.filter(
  //   (app: AppointmentResponse) => app.status === "cancelled"
  // );

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
        <section className="w-full flex items-center justify-between">
          <ScheduleSearch doctors={doctors} />
          <DateFilter />
        </section>
        <Suspense
          key={patient + currentPage}
          fallback={<LatestInvoicesSkeleton />}
        >
          <DataTable
            totalPages={appointments.totalPages}
            itemsperPage={8}
            columns={columns}
            data={appointments?.allAppointments}
            currentPage={currentPage}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default RendezvousPage;
