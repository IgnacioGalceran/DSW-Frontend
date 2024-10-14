"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "@/firebase/config";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import { validate } from "./validationsFields";
import useCRUD from "@/hooks/useCrud";
import { Pacientes } from "@/app/pages/pacientes/type";
import useForm from "@/hooks/useForm";
import { validatePacientes } from "@/app/pages/pacientes/validations";
import Input from "@/components/Input";
import Select from "@/components/Select";

const page = () => {
  const router = useRouter();

  const { insert } = useCRUD<Pacientes>("pacientes");

  const submitPaciente = async (
    value: Pacientes & {
      email: string;
      password: string;
      repeatPassword: string;
    }
  ) => {
    let result = await insert(value);

    if (!result.error) {
      router.push("/auth");
    }
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm<
    Pacientes & { email: string; password: string; repeatPassword: string }
  >(
    {
      email: "",
      password: "",
      repeatPassword: "",
      usuario: {
        uid: "",
        nombre: "",
        apellido: "",
        tipoDni: "",
        dni: "",
      },
    },
    validatePacientes,
    submitPaciente
  );

  const classButton =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mt-5 px-4 text-lg rounded focus:outline-none focus:shadow-outline mx-auto block";

  return (
    <div
      className={`${styles.claseTest} flex h-screen flex-col px-6 py-12 lg:px-8`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Registro - Turnos médicos
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
              type="text"
              name="usuario.nombre"
              value={values.usuario?.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors["usuario.nombre"]}
              placeholder="Nombre*"
            />
            <Input
              type="text"
              name="usuario.apellido"
              value={values.usuario?.apellido}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors["usuario.apellido"]}
              placeholder="Apellido*"
            />
            <Select
              name="usuario.tipoDni"
              value={values.usuario?.tipoDni}
              onChange={handleChange}
              onBlur={handleBlur}
              options={[
                { id: "Dni", nombre: "Dni" },
                { id: "Pasaporte", nombre: "Pasaporte" },
              ]}
              error={errors["usuario.tipoDni"]}
              placeholder="Tipo DNI"
            />
            <Input
              type="text"
              name="usuario.dni"
              value={values.usuario?.dni}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors["usuario.dni"]}
              placeholder="Número de DNI*"
            />
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors["email"]}
              placeholder="Correo electrónico*"
            />
            <Input
              type="text"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors["password"]}
              placeholder="Contraseña*"
            />
            <Input
              type="text"
              name="repeatPassword"
              value={values.repeatPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors["repeatPassword"]}
              placeholder="Repetir contraseña*"
            />
          </div>
          <button className={classButton} type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
