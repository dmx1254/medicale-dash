import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import PatientModel from "@/lib/models/patient.model";
import bcrypt from "bcrypt";

connectDB();

export const options: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"phone" | "password", string> | undefined,
        req
      ) {
        if (credentials) {
          const user = await PatientModel.findOne({ phone: credentials.phone });
          if (!user) {
            throw new Error("Pas de docteur avec ce numéro");
          }
          if (user.isBan) {
            throw new Error("Ce numéro a été banni");
          }
          if (!user.isAdmin) {
            throw new Error("Vous n'êtes pas autorise à vous connecter");
          }
          if (!user.isAdmin) {
            throw new Error("Vous n'êtes pas autorise à vous connecter");
          }
          if (user.role === "PATIENT") {
            throw new Error("Vous n'êtes pas autorise à vous connecter");
          }
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isCorrectPassword) {
            throw new Error("Mot de passe incorrect");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        return null; // Assurez-vous de retourner null si credentials est undefined
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    // async redirect({ url, baseUrl, token }) {
    //   if (token?.role === "DOCTEUR") {
    //     return baseUrl + "/dashboard";
    //   } else {
    //     return `${baseUrl}/patient/${token?.id}/profile#informations-personnelles`;
    //   }
    // },
  },
};
