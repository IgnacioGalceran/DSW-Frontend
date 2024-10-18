import { useEffect, useState } from "react";
import { Especialidades } from "./type";
import styles from "./especialidades.module.css";
import Input from "@/components/Input";
import useForm from "@/hooks/useForm";
import { validateEspecialidades } from "./validations";
import Confirma from "@/components/Confirmacion";

export const InsertEspecialidades = (props: {
  initialValues: any;
  isUpdating: boolean;
  setOpenForm: any;
  especialidad: any;
  insert: any;
  update: any;
  remove: any;
}) => {
  const { especialidad } = props;
  console.log(especialidad);
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const { classButtonEdit, classButtonDelete } = styles;
  const submitEspecialidades = async (value: Especialidades) => {
    try {
      if (props.isUpdating) {
        await props.update(props.initialValues?.id, value);
      }
      if (!props.isUpdating) {
        await props.insert(value);
      } else {
      }
      props.setOpenForm(false);
    } catch (error) {
      console.error("Error al enviar la especialidad :", error);
    }
  };

  const { values, setValues, errors, handleChange, handleBlur, handleSubmit } =
    useForm<Especialidades>(
      {
        id: "",
        nombre: "",
        medicos: [],
      },
      validateEspecialidades,
      submitEspecialidades
    );

  useEffect(() => {
    if (especialidad) {
      setValues({
        nombre: especialidad,
      });
    } else {
      setValues({
        nombre: "",
      });
    }
  }, [especialidad, setValues]);

  const handleConfirma = (e: any) => {
    e.preventDefault();
    setOpenConfirma(true);
  };

  return (
    <>
      {openConfirma && (
        <Confirma
          message="Está seguro que quiere editar la especialidad?"
          open={openConfirma}
          setOpenConfirma={setOpenConfirma}
          handleConfirma={handleSubmit}
        />
      )}
      <form
        onSubmit={(e) => handleConfirma(e)}
        className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full sm:w-1/2 mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <Input
            type="text"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.nombre}
            placeholder="Nombre de la especialidad"
          />
        </div>
        <div className={styles.containerButtons}>
          <button className={classButtonEdit} type="submit">
            {especialidad ? "Editar" : "Cargar especialidad"}
          </button>
          {especialidad && (
            <button className={classButtonDelete} type="submit">
              Borrar
            </button>
          )}
        </div>
      </form>
    </>
  );
};
