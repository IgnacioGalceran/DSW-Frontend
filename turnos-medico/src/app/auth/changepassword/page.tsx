"use client";
import React from "react";
import { Pacientes } from "@/app/pages/pacientes/type";
import useForm from "@/hooks/useForm";
import Input from "@/components/Input";
import styles from "./changepassword.module.css";
import { changePasswordValidation } from "./validation";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPasswordReset, getAuth } from "firebase/auth";
import { useToast } from "@/context/ToastContext";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();
  const changePassword = async (value: {
    password: string;
    repeatPassword: string;
  }) => {
    const auth = getAuth();
    let oobCode = searchParams ? searchParams?.get("oobCode") : "";

    if (typeof oobCode === "string") {
      try {
        await confirmPasswordReset(auth, oobCode, value.password);
        showToast("Contraseña cambiada correctamente", "OK", 3000);
        router.push("/auth");
      } catch (error: any) {
        showToast(error.message, "FAIL", 3000);
      }
    } else {
      showToast("Código de restablecimiento no válido.", "FAIL", 3000);
    }
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm<{
    password: string;
    repeatPassword: string;
  }>(
    {
      password: "",
      repeatPassword: "",
    },
    changePasswordValidation,
    changePassword
  );

  const classButton =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mt-5 px-4 text-lg rounded focus:outline-none focus:shadow-outline mx-auto block";

  return (
    <React.Fragment>
      <div
        className={`${styles.claseTest} flex h-screen flex-col px-6 py-12 lg:px-8`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 m-4">
            Cambio de contraseña - Turnos médicos
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-2"
            action="#"
            method="POST"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="grid grid-cols-1 gap-1">
              <Input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors["password"]}
                placeholder="Contraseña*"
              />
              <Input
                type="password"
                name="repeatPassword"
                value={values.repeatPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors["repeatPassword"]}
                placeholder="Repetir contraseña*"
              />
            </div>
            <button className={classButton} type="submit">
              Cambiar contraseña
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default page;
