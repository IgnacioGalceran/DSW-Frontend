import { useState } from "react";
import useForm from "@/hooks/useForm";
import Confirma from "@/components/Confirmacion";
import Input from "@/components/Input";
import { Especialidades } from "../especialidades/type";
import React from "react";
import { validateEspecialidades } from "./validations";

type FormValues = Especialidades;

export default function InsertEspecialidades(props: {
  initialValues: any;
  isUpdating: boolean;
  setOpenForm: any;
  insert: any;
  update: any;
}) {
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);

  const submitEspecialidad = async (value: Especialidades) => {
    try {
      if (props.isUpdating) {
        await props.update(props.initialValues?.id, value);
      } else {
        await props.insert(value);
      }
      props.setOpenForm(false);
    } catch (error) {
      throw error;
    }
  };

  const getInitialFormValues = (
    initialValues: FormValues,
    isUpdating: boolean
  ): FormValues => {
    if (isUpdating) {
      return {
        nombre: initialValues?.nombre || "",
      };
    }

    return {
      nombre: "",
    };
  };

  const initialFormValues = getInitialFormValues(
    props.initialValues,
    props.isUpdating
  );

  const classButton =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mt-2 px-2 text-lg rounded focus:outline-none focus:shadow-outline mx-auto block";

  const handleConfirma = (e: any) => {
    e.preventDefault();
    setOpenConfirma(true);
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useForm<FormValues>(
      { ...initialFormValues },
      validateEspecialidades,
      submitEspecialidad
    );

  return (
    <React.Fragment>
      {openConfirma && (
        <Confirma
          message={
            props.isUpdating
              ? "Está seguro que quiere actualizar la especialidad?"
              : "Está seguro que quiere agregar la especialidad"
          }
          open={openConfirma}
          setOpenConfirma={setOpenConfirma}
          handleConfirma={handleSubmit}
        />
      )}
      <form
        onSubmit={(e) => handleConfirma(e)}
        className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full sm:w-1/2 lg:w-3/4 xl:w-2/3 mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            id="input-especialidad"
            type="text"
            name="nombre"
            value={values.nombre || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["nombre"]}
            placeholder="Nombre especialidad"
          />
        </div>
        <button id="add-especialidad" className={classButton} type="submit">
          {props.isUpdating ? "Actualizar especialidad" : "Cargar especialidad"}
        </button>
      </form>
    </React.Fragment>
  );
}
