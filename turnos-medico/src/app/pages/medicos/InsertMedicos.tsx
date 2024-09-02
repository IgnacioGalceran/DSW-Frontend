import { API_URL } from "@/constants/const";
import { useState } from "react";
import { FirebaseAuth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { validateMedicos } from "./validations";
import { Medicos } from "./type";
import useCreate from "@/hooks/useCreate";
import useForm from "@/hooks/useForm";
import Confirma from "@/components/Confirmacion";
import Input from "@/components/Input";
import Select from "@/components/Select";
import useCRUD from "@/hooks/useCrud";

export default function InsertMedicos() {
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const { insert } = useCRUD<Medicos>("medicos");

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

  const classButton =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mt-5 px-4 text-lg rounded focus:outline-none focus:shadow-outline mx-auto block";

  const handleConfirma = (e: any) => {
    e.preventDefault();

    setOpenConfirma(true);
  };

  return (
    <>
      {openConfirma && (
        <Confirma
          message="Está seguro que quiere agregar el médico"
          open={openConfirma}
          setOpenConfirma={setOpenConfirma}
          handleConfirma={handleSubmit}
        />
      )}
      <form
        onSubmit={(e) => handleConfirma(e)}
        className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full sm:w-1/2 mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="usuario.nombre"
            value={values.usuario?.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["usuario.nombre"]}
            placeholder="Nombre del Médico*"
          />
          <Input
            type="text"
            name="usuario.apellido"
            value={values.usuario?.apellido}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["usuario.apellido"]}
            placeholder="Apellido del Médico*"
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
            placeholder="Dni del Médico*"
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
          <Input
            type="text"
            name="matricula"
            value={values.matricula}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["matricula"]}
            placeholder="Matrícula*"
          />
        </div>
        <button className={classButton} type="submit">
          Cargar Médico
        </button>
      </form>
    </>
  );
}
