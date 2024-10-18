import { useState } from "react";
import { FirebaseAuth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Medicos } from "./type";
import useForm from "@/hooks/useForm";
import Confirma from "@/components/Confirmacion";
import Input from "@/components/Input";
import Select from "@/components/Select";
import useCRUD from "@/hooks/useCrud";
import { Especialidades } from "../especialidades/type";
import { validateUpdate } from "./validations/validateUpdate";
import { validateInsert } from "./validations/validateInsert";

type FormValues = Medicos & {
  email?: string;
  password?: string;
  repeatPassword?: string;
};

export default function InsertMedicos(props: {
  initialValues?: any;
  isUpdating: boolean;
  setOpenForm: any;
  especialidades: Especialidades[];
  insert: any;
  update: any;
}) {
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);

  const submitMedicos = async (
    value: Medicos & {
      email: string;
      password: string;
      repeatPassword: string;
    }
  ) => {
    try {
      if (props.isUpdating) {
        await props.update(props.initialValues?.id, value);
      } else {
        await props.insert(value);
      }
      props.setOpenForm(false);
    } catch (error) {
      console.error("Error al enviar el médico:", error);
    }
  };

  const getInitialFormValues = (
    initialValues: FormValues,
    isUpdating: boolean
  ): FormValues => {
    if (isUpdating) {
      return {
        matricula: initialValues.matricula || "",
        especialidad: initialValues.especialidad?.id.toString() || "",
        usuario: {
          uid: initialValues.usuario?.uid || "",
          nombre: initialValues.usuario?.nombre || "",
          apellido: initialValues.usuario?.apellido || "",
          tipoDni: initialValues.usuario?.tipoDni || "",
          dni: initialValues.usuario?.dni || "",
        },
      };
    }

    return {
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
    };
  };

  const initialFormValues = getInitialFormValues(
    props.initialValues,
    props.isUpdating
  );

  const classButton =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mt-5 px-4 text-lg rounded focus:outline-none focus:shadow-outline mx-auto block";

  const handleConfirma = (e: any) => {
    e.preventDefault();
    setOpenConfirma(true);
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useForm<FormValues>(
      { ...initialFormValues },
      props.isUpdating ? validateUpdate : validateInsert,
      submitMedicos
    );

  return (
    <>
      {openConfirma && (
        <Confirma
          message={
            props.isUpdating
              ? "Está seguro que quiere actualizar el médico?"
              : "Está seguro que quiere agregar el médico"
          }
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
          {!props.isUpdating && (
            <>
              <Input
                type="email"
                name="email"
                value={values.email || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors["email"]}
                placeholder="Correo electrónico*"
              />
              <Input
                type="text"
                name="password"
                value={values.password || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors["password"]}
                placeholder="Contraseña*"
              />
              <Input
                type="text"
                name="repeatPassword"
                value={values.repeatPassword || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors["repeatPassword"]}
                placeholder="Repetir contraseña*"
              />
            </>
          )}

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
          <Select
            name="especialidad"
            value={values.especialidad}
            onChange={handleChange}
            onBlur={handleBlur}
            options={props.especialidades}
            error={errors["especialidad"]}
            placeholder="Especialidad"
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
          {props.isUpdating ? "Actualizar médico" : "Cargar médico"}
        </button>
      </form>
    </>
  );
}
