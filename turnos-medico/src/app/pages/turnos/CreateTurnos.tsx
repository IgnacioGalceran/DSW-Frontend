import { API_URL } from "@/constants/const";
import { useEffect, useState } from "react";
import { FirebaseAuth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { validateMedicos } from "./validations";
// import { Medicos } from "./type";
import useCreate from "@/hooks/useCreate";
import useForm from "@/hooks/useForm";
import Confirma from "@/components/Confirmacion";
import Input from "@/components/Input";
import Select from "@/components/Select";
import useCRUD from "@/hooks/useCrud";
import { Turnos } from "./type";
import { validateTurnos } from "./validations";
import { Medicos } from "../medicos/type";
import { Especialidades } from "../especialidades/type";
import moment from "moment";

interface Turno {
  fecha: Date;
  especialidad: string;
  medico: string;
  paciente: string;
}

export default function InsertTurnos(props: {
  especialidades: response<Especialidades>;
}) {
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const [idEspecialidad, setIdEspecialidad] = useState<string | null>(null);
  const { insert } = useCRUD<Turnos>("turnos");
  const {
    fetchData,
    data: medicos,
    loading: loadingMedicos,
  } = useCRUD<Medicos>(`medicos/findMedicosbyEspecialidad/${idEspecialidad}`);

  const submitTurnos = async (value: Turnos) => {
    await insert(value);
  };
  moment.locale("es");

  const fecha = moment().locale("es - es").format("dddd");
  console.log(fecha); // Por ejemplo: "martes, 1 de octubre de 2024 12:00"

  useEffect(() => {
    if (idEspecialidad) {
      fetchData();
    }
  }, [idEspecialidad]);

  console.log(medicos);

  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useForm<Turno>(
      { fecha: new Date(), especialidad: "", medico: "", paciente: "" },
      validateTurnos,
      submitTurnos
    );

  const getValueEspecialidad = (e: any) => {
    const { value } = e.target;
    setIdEspecialidad(value);
    handleChange(e);
  };

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
          message="Está seguro que quiere agregar el turn"
          open={openConfirma}
          setOpenConfirma={setOpenConfirma}
          handleConfirma={handleSubmit}
        />
      )}
      <form
        onSubmit={(e) => handleConfirma(e)}
        className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full sm:w-1/2 mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Select
            name="especialidad"
            value={values.especialidad}
            onChange={getValueEspecialidad}
            onBlur={handleBlur}
            options={props.especialidades.data}
            // error={} //
            placeholder="Elegir especialidad"
          />
        </div>
      </form>
      {medicos.data?.length > 0 &&
        medicos.data?.map((medico) => (
          <div
            className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full sm:w-1/2 mx-auto"
            key={medico.usuario.id}
          >
            {medico.usuario.nombre} {medico.usuario.apellido}
          </div>
        ))}
    </>
  );
}
