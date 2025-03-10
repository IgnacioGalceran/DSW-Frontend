import { useState } from "react";
import useForm from "@/hooks/useForm";
import Confirma from "@/components/Confirmacion";
import { ObraSocial } from "./type";
import { obrasSocialUpdate, obrasSocialAdd } from "./validations";
import Input from "@/components/Input";
import React from "react";

type FormValues = ObraSocial;

export default function InsertObrasSociales(props: {
  initialValues: any;
  isUpdating: boolean;
  setOpenForm: any;
  insert: any;
  update: any;
}) {
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);

  const submitObraSocial = async (value: ObraSocial) => {
    try {
      if (props.isUpdating) {
        await props.update(props.initialValues?.id, value);
      } else {
        await props.insert(value);
      }
      props.setOpenForm(false);
    } catch (error) {}
  };

  const getInitialFormValues = (
    initialValues: FormValues,
    isUpdating: boolean
  ): FormValues => {
    if (isUpdating) {
      return {
        nombre: initialValues?.nombre || "",
        cuit: initialValues.cuit || "",
        email: initialValues.email || "",
        telefono: initialValues.telefono || "",
        direccion: initialValues.direccion || "",
      };
    }

    return {
      nombre: "",
      cuit: "",
      email: "",
      telefono: "",
      direccion: "",
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
      props.isUpdating ? obrasSocialUpdate : obrasSocialAdd,
      submitObraSocial
    );

  return (
    <React.Fragment>
      {openConfirma && (
        <Confirma
          message={
            props.isUpdating
              ? "Está seguro que quiere actualizar la obra social?"
              : "Está seguro que quiere agregar la obra social"
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
            type="text"
            name="nombre"
            value={values.nombre || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["nombre"]}
            placeholder="Nombre"
          />
          <Input
            type="text"
            name="cuit"
            value={values.cuit || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["cuit"]}
            placeholder="Cuit"
          />
          <Input
            type="text"
            name="telefono"
            value={values.telefono || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["telefono"]}
            placeholder="Telefono"
          />
          <Input
            type="email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["email"]}
            placeholder="Email"
          />
          <Input
            type="text"
            name="direccion"
            value={values.direccion || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["direccion"]}
            placeholder="Dirección"
          />
        </div>
        <button className={classButton} type="submit">
          {props.isUpdating ? "Actualizar obra social" : "Cargar obra social"}
        </button>
      </form>
    </React.Fragment>
  );
}
