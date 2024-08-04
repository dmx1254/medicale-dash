"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    phone,
    password,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    const userData = {
      phone,
      password,
    };

    const user = await signIn("credentials", {
      phone: userData.phone,
      password: userData.password,
      redirect: false,
    });

    if (user?.ok === false) {
      toast.error(user?.error, {
        style: {
          color: "#ef4444",
          background: "#0D0F10",
          border: "1px solid #363A3D",
        },
      });
    } else {
      router.push("/dashboard");
    }

    // if (user) router.push("/patients/profile");
    // if (user) router.push(`/patients/${user.$id}/register`);

    try {
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Bonjour 👋</h1>
          <p className="text-dark-700">Planifier votre premier rendez-vous.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Telephone"
          placeholder="771234567"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Mot de passe"
          placeholder="mot de passe"
          iconSrc="/assets/icons/password.svg"
          iconAlt="password"
        />
        <SubmitButton isLoading={isLoading}>Commencer</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
