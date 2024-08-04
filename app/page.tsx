import PasskeyModal from "@/components/PasskeyModal";
import PatientForm from "@/components/forms/PatientForm";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";

export default async function Home({ searchParams }: SearchParamProps) {
  const session = await getServerSession(options);
  if (session) redirect("/dashboard");
  return (
    <div className="flex h-screen max-h-screen">
      {/* {session?.user.role === "DOCTOR" && <PasskeyModal />} */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="medicale care"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex items-start justify-start">
            <p className="text-dark-600 xl:text-left">
              &copy; 2024 MedicaleCare
            </p>
            {/* <Link href="/register" className="text-green-500">
              s'inscrire
            </Link> */}
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        alt="medicale care"
        height={1000}
        width={1000}
        className="side-img max-w-[50%] sticky top-0 right-0 bottom-0"
      />
    </div>
  );
}
