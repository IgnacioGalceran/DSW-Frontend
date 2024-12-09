"use client";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React from "react";
import { useRouter } from "next/navigation";
import { validate } from "./validationsFields";
import useCRUD from "@/hooks/useCrud";
import { Pacientes } from "@/app/pages/pacientes/type";
import useForm from "@/hooks/useForm";
import { registerPaciente } from "./validationsFields";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/Loader";
import styles from "./register.module.css";

const page = () => {
  const router = useRouter();
  const { sendVerificationEmail } = useAuth();
  const { insert, loading } = useCRUD<Pacientes>("pacientes");
  const submitPaciente = async (
    value: Pacientes & {
      email: string;
      password: string;
      repeatPassword: string;
    }
  ) => {
    const auth = getAuth();
    let registeredUser;

    if (value.usuario.email) {
      registeredUser = await createUserWithEmailAndPassword(
        auth,
        value.usuario.email,
        value.password
      );
    }

    if (!registeredUser) return;

    value.usuario.uid = registeredUser.user.uid;
    const { password, repeatPassword, ...restValue } = value;

    let result = await insert(restValue);

    if (!result.error) {
      await sendVerificationEmail(registeredUser.user);
    }

    if (!result.error) {
      router.push("/auth");
    }
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm<
    Pacientes & { password: string; repeatPassword: string }
  >(
    {
      password: "",
      repeatPassword: "",
      usuario: {
        uid: "",
        nombre: "",
        apellido: "",
        tipoDni: "",
        dni: "",
        email: "",
      },
    },
    registerPaciente,
    submitPaciente
  );

  const classButton =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mt-5 px-4 text-lg rounded focus:outline-none focus:shadow-outline mx-auto block";

  return (
    <React.Fragment>
      {loading && <Loader />}
      <div
        className={`${styles.claseTest} flex h-screen flex-col px-6 py-12 lg:px-8`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 m-4">
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
                type="text"
                name="usuario.email"
                value={values.usuario.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors["usuario.email"]}
                placeholder="Correo electrónico*"
              />
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
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default page;
