import { useEffect, useState } from "react";
import { Especialidades } from "./type";
import styles from "./especialidades.module.css";
import Input from "@/components/Input";
import useForm from "@/hooks/useForm";
import { validateEspecialidades } from "./validations";
import Confirma from "@/components/Confirmacion";

export const InsertEspecialidades = (props: {
  isUpdating: boolean;
  setOpenForm: any;
  especialidad: Especialidades | undefined;
  insert: any;
  update: any;
  remove: any;
}) => {
  const { especialidad } = props;

  const [confirmaState, setConfirmaState] = useState<any>({
    open: false,
    message: "",
    onConfirm: undefined,
  });

  const { classButtonEdit, classButtonDelete } = styles;

  const submitEspecialidades = async (value: Especialidades) => {
    try {
      if (props.isUpdating) {
        await props.update(props.especialidad?.id, value);
      }
      if (!props.isUpdating) {
        await props.insert(value);
      }
      props.setOpenForm(false);
    } catch (error) {
      console.error("Error al enviar la especialidad :", error);
    }
  };

  const deleteEspecialidad = async (id: string | undefined) => {
    await props.remove(id);
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
        nombre: especialidad.nombre,
      });
    } else {
      setValues({
        nombre: "",
      });
    }
  }, [especialidad, setValues]);

  const handleConfirma = (e: any) => {
    e.preventDefault();
    setConfirmaState({
      open: true,
      message: especialidad
        ? "Estas seguro de confirmar los cambios?"
        : "Estas seguro de cargar una nueva especialidad?",
      onConfirm: handleSubmit,
    });
  };

  const handleDelete = () => {
    setConfirmaState({
      open: true,
      message: "Estas seguro que quieres borrar la especialidad?",
      onConfirm: () => deleteEspecialidad(especialidad?.id),
    });
  };

  const setOpenConfirma = (open: boolean) => {
    setConfirmaState({
      open: false,
      message: "",
      onConfirm: undefined,
    });
  };

  return (
    <>
      {confirmaState.open && (
        <Confirma
          message={confirmaState.message}
          open={confirmaState.open}
          setOpenConfirma={setOpenConfirma}
          handleConfirma={confirmaState.onConfirm}
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
            <button
              className={classButtonDelete}
              onClick={handleDelete}
              type="button"
            >
              Borrar
            </button>
          )}
        </div>
      </form>
    </>
  );
};
