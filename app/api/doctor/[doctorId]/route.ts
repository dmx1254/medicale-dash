import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PatientModel from "@/lib/models/patient.model";

connectDB();

export async function GET(request: Request, context: any) {
  const { params } = context;
  const { doctorId } = params;

  if (!doctorId) {
    return NextResponse.json({ error: "doctorId is invalid" });
  }

  try {
    const doctor = await PatientModel.findOne({
      _id: doctorId,
      role: "DOCTOR",
    }).select("profile");

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" });
    }

    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch doctors"+ error },
      { status: 500 }
    );
  }
}
