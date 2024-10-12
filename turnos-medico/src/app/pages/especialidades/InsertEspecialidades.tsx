import { useState } from "react";
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

  const [nombre, setNombre] = useState(especialidad ? especialidad.nombre : "");

  const { insert, update } = useCRUD<Especialidades>("especialidades");

  const submitEspecialidades = async (value: Especialidades) => {
    await insert(value);
    // setNombre("");
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useForm<Especialidades>(
      {
        id: "",
        nombre: "",
        medicos: [],
      },
      validateEspecialidades,
      submitEspecialidades
    );
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
          message="Está seguro que quiere editar la especiali"
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
            name="especialidad.nombre"
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["usuario.nombre"]}
            placeholder="Nombre de la especialidad"
          />
        </div>
        <button className={classButton} type="submit">
          Cargar especialidad
        </button>
      </form>
    </>
  );
};
