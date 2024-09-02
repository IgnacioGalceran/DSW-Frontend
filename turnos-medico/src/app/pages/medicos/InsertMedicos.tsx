import { API_URL } from "@/constants/const";
import { useState } from "react";
import { FirebaseAuth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { validateMedicos } from "./validations";
import { Medicos } from "./type";
import useCreate from "@/hooks/useCreate";
import useForm from "@/hooks/useForm";

export default function InsertMedicos() {
  const { insert } = useCreate("auth/registerMedico");

  const submitMedicos = async (
    value: Medicos & {
      email: string;
      password: string;
      repeatPassword: string;
    }
  ) => {
    await insert(value);
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm<
    Medicos & { email: string; password: string; repeatPassword: string }
  >(
    {
      email: "",
      password: "",
      repeatPassword: "",
      matricula: "",
      usuario: {
        uid: "",
        nombre: "",
        apellido: "",
        tipoDni: "",
        dni: "",
      },
    },
    validateMedicos,
    submitMedicos
  );
  const classLabel = "block text-gray-700 text-sm font-bold";
  const classInputBase =
    "shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const classInputValid = "border-green-500";
  const classInputError = "border-red-500";
  const classButton =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mt-5 px-4 text-lg rounded focus:outline-none focus:shadow-outline mx-auto block";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full sm:w-1/2 mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="my-2">
          <label className={classLabel}>Nombre Médico*</label>
          <input
            type="text"
            name="usuario.nombre"
            value={values.usuario.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${classInputBase} ${
              errors["usuario.nombre"]
                ? classInputError
                : values.usuario.nombre && !errors["usuario.nombre"]
                ? classInputValid
                : ""
            }`}
          />
          <p
            className={`text-red-500 text-xs italic ${
              errors["usuario.nombre"] ? "visible" : "invisible"
            }`}
          >
            {errors["usuario.nombre"] || "Placeholder"}
          </p>
        </div>
        <div className="my-2">
          <label className={classLabel}>Apellido Médico*</label>
          <input
            type="text"
            name="usuario.apellido"
            value={values.usuario.apellido}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${classInputBase} ${
              errors["usuario.apellido"]
                ? classInputError
                : values.usuario.apellido && !errors["usuario.apellido"]
                ? classInputValid
                : ""
            }`}
          />
          <p
            className={`text-red-500 text-xs italic ${
              errors["usuario.apellido"] ? "visible" : "invisible"
            }`}
          >
            {errors["usuario.apellido"] || "Placeholder"}
          </p>
        </div>
        <div className="my-2">
          <label className={classLabel}>Tipo DNI</label>
          <select
            name="usuario.tipoDni"
            value={values.usuario.tipoDni}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${classInputBase} ${
              errors["usuario.tipoDni"]
                ? classInputError
                : values.usuario.tipoDni && !errors["usuario.tipoDni"]
                ? classInputValid
                : ""
            }`}
          >
            <option value={""}>Seleccionar Tipo DNI</option>
            <option value={"Dni"}>Dni</option>
            <option value={"Pasaporte"}>Pasaporte</option>
          </select>
          <p
            className={`text-red-500 text-xs italic ${
              errors["usuario.tipoDni"] ? "visible" : "invisible"
            }`}
          >
            {errors["usuario.tipoDni"] || "Placeholder"}
          </p>
        </div>
        <div className="my-2">
          <label className={classLabel}>Dni</label>
          <input
            type="text"
            name="usuario.dni"
            value={values.usuario.dni}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${classInputBase} ${
              errors["usuario.dni"]
                ? classInputError
                : values.usuario.dni && !errors["usuario.dni"]
                ? classInputValid
                : ""
            }`}
          />
          <p
            className={`text-red-500 text-xs italic ${
              errors["usuario.dni"] ? "visible" : "invisible"
            }`}
          >
            {errors["usuario.dni"] || "Placeholder"}
          </p>
        </div>
        <div className="my-2">
          <label className={classLabel}>Correo electrónico</label>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${classInputBase} ${
              errors.email
                ? classInputError
                : values.email && !errors.email
                ? classInputValid
                : ""
            }`}
          />
          <p
            className={`text-red-500 text-xs italic ${
              errors.email ? "visible" : "invisible"
            }`}
          >
            {errors.email || "Placeholder"}
          </p>
        </div>
        <div className="my-2">
          <label className={classLabel}>Contraseña</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${classInputBase} ${
              errors.password
                ? classInputError
                : values.password && !errors.password
                ? classInputValid
                : ""
            }`}
          />
          <p
            className={`text-red-500 text-xs italic ${
              errors.password ? "visible" : "invisible"
            }`}
          >
            {errors.password || "Placeholder"}
          </p>
        </div>
        <div className="my-2">
          <label className={classLabel}>Repetir contraseña</label>
          <input
            type="password"
            name="repeatPassword"
            value={values.repeatPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${classInputBase} ${
              errors.repeatPassword
                ? classInputError
                : values.repeatPassword && !errors.repeatPassword
                ? classInputValid
                : ""
            }`}
          />
          <p
            className={`text-red-500 text-xs italic ${
              errors.repeatPassword ? "visible" : "invisible"
            }`}
          >
            {errors.repeatPassword || "Placeholder"}
          </p>
        </div>
        <div className="my-2">
          <label className={classLabel}>Matrícula*</label>
          <input
            type="text"
            name="matricula"
            value={values.matricula}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${classInputBase} ${
              errors.matricula
                ? classInputError
                : values.usuario.apellido && !errors.matricula
                ? classInputValid
                : ""
            }`}
          />
          <p
            className={`text-red-500 text-xs italic ${
              errors.matricula ? "visible" : "invisible"
            }`}
          >
            {errors.matricula || "Placeholder"}
          </p>
        </div>
      </div>
      <button className={classButton} type="submit">
        Cargar Médico
      </button>
    </form>
  );
}
