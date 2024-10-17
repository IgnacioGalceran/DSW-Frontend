import { useEffect, useState } from "react";
import { Especialidades } from "./type";
import useCRUD from "@/hooks/useCrud";
import Input from "@/components/Input";
import useForm from "@/hooks/useForm";
import { validateEspecialidades } from "./validations";
import Confirma from "@/components/Confirmacion";

export const InsertEspecialidades = ({
  especialidad,
}: {
  especialidad: Especialidades | null;
}) => {
  console.log(especialidad);
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);

  const { insert, update } = useCRUD<Especialidades>("especialidades");

  const submitEspecialidades = async (value: Especialidades) => {
    console.log("Submit values:", value);

    // if (especialidad) {
    //   await update(value.id, value.nombre); // Si estás editando
    // } else {
    //   await insert(value); // Si estás creando una nueva
    // }
  };

  const { values, setValues, errors, handleChange, handleBlur, handleSubmit } =
    useForm<Especialidades>(
      {
        nombre: "",
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
    setOpenConfirma(true);
  };

  const classButton =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mt-5 px-4 text-lg rounded focus:outline-none focus:shadow-outline mx-auto block";

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
        <button className={classButton} type="submit">
          {especialidad ? "Editar especialidad" : "Cargar especialidad"}
        </button>
      </form>
    </>
  );
};
