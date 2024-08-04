import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Overview } from "@/components/dash-comp/overview";
import { RecentAppointments } from "@/components/dash-comp/RecentAppointments";
import { SearchParamProps } from "@/types";
import PasskeyModal from "@/components/PasskeyModal";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/option";

export const metadata: Metadata = {
  title: "Medicalecare Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage({
  searchParams,
}: SearchParamProps) {
  const session = await getServerSession(options);
  return (
    <>
      <div className="flex-col md:flex">
        {session?.user.role === "DOCTOR" && <PasskeyModal />}
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-8 md:pt-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-dark-400">
              <TabsTrigger
                value="overview"
                className="bg-green-600 text-green-500"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="stat-card-admin bg-appointments border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-14-regular">
                      Total Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-22-bold text-white">$45,231.89</div>
                    <p className="text-xs text-green-500">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="stat-card-admin bg-appointments border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Subscriptions
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-22-bold">+2350</div>
                    <p className="text-xs text-green-500">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="stat-card-admin bg-appointments border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-22-bold">+12,234</div>
                    <p className="text-xs text-green-500">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="stat-card-admin bg-appointments border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-22-bold">+573</div>
                    <p className="text-xs text-green-500">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-dark-500">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-4 md:col-span-3 border-dark-500">
                  <CardHeader>
                    <CardTitle>Rendez vous recents</CardTitle>
                    <CardDescription className="text-xs text-green-500">
                      Vous avez 265 rendez programmés ce mois.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentAppointments />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
