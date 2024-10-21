import { useEffect, useState } from "react";
import useForm from "@/hooks/useForm";
import Confirma from "@/components/Confirmacion";
import Input from "@/components/Input";
import Select from "@/components/Select";
import useCRUD from "@/hooks/useCrud";
import { Turnos } from "./type";
import { validateTurnos } from "./validations";
import { Medicos } from "../medicos/type";
import { Especialidades } from "../especialidades/type";
import React from "react";
import styles from "./turnos.module.css";
import ModalTurno from "./ModalTurno";

interface Turno {
  fecha: Date;
  especialidad: string;
  medico: string;
  paciente: string;
}

export default function InsertTurnos(props: {
  especialidades: response<Especialidades>;
}) {
  const [openModal, setOpenModal] = useState<{ open: boolean; data: any }>({
    open: false,
    data: null,
  });
  const [idEspecialidad, setIdEspecialidad] = useState<string | null>(null);
  const {
    fetchData,
    data: medicos,
    loading: loadingMedicos,
  } = useCRUD<Medicos>(`medicos/findMedicosbyEspecialidad/${idEspecialidad}`);
  const { insert } = useCRUD<Turnos>("turnos");

  const submitTurnos = async (value: Turnos) => {
    await insert(value);
  };

  useEffect(() => {
    if (idEspecialidad) {
      fetchData();
    }
  }, [idEspecialidad]);

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

  return (
    <React.Fragment>
      {openModal.open && (
        <ModalTurno
          openModal={openModal}
          setOpenModal={setOpenModal}
          insert={insert}
        />
      )}
      <form className={`${styles.form} bg-white shadow-md rounded px-8 py-6`}>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {props.especialidades?.data?.length > 0 && (
            <Select
              name="especialidad"
              value={values.especialidad}
              onChange={getValueEspecialidad}
              onBlur={handleBlur}
              options={props.especialidades.data}
              // error={} //
              placeholder="Elegir especialidad"
            />
          )}
        </div>
        {medicos.data?.length > 0 && (
          <div className={`${styles.medicosContainer}`}>
            {medicos.data?.map((medico, index) => (
              <div
                className={`${styles.medicoCard}  shadow-md rounded py-2 px-4`}
                key={index}
                onClick={() => setOpenModal({ open: true, data: medico })}
              >
                <p className="text-center">
                  {medico.usuario.nombre} {medico.usuario.apellido}
                </p>
                <div className={styles.diasAtencion}>
                  <span>Días de atención:</span>
                  {medico.diasAtencion?.map((dia, index) => (
                    <span key={index}>{dia}</span>
                  ))}
                </div>
                <p>
                  <span>Rango de horarios:</span> {medico.horaDesde} -{" "}
                  {medico.horaHasta}
                </p>
              </div>
            ))}
          </div>
        )}
      </form>
    </React.Fragment>
  );
}
