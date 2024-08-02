import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { options } from "./api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MedicaleCare",
  description: "A healthcare management system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  if (session) redirect("/dashboard");
  // if (session) {
  //   if (session.user.role === "DOCTOR") {
  //     redirect("/dashboard");
  //   } else {
  //     redirect(`/patient/${session.user.id}/profile#informations-personnelles`);
  //   }
  // } else {
  //   redirect("/");
  // }
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          // disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
