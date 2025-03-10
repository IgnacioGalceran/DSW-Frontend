import { useEffect, useState } from "react";
import useForm from "@/hooks/useForm";
import Select from "@/components/Select";
import useCRUD from "@/hooks/useCrud";
import { Turnos } from "./type";
import { validateTurnos } from "./validations";
import { Especialidades } from "../../pages/especialidades/type";
import React from "react";
import styles from "./turnos.module.css";
import ModalTurno from "./ModalTurno";
import Loader from "@/components/Loader";
import { ObraSocial } from "@/app/pages/obrasocial/type";
import { Medicos } from "@/app/pages/medicos/type";

interface Turno {
  fecha: Date;
  especialidad: string;
  medico: string;
  paciente: string;
}

export default function InsertTurnos(props: {
  especialidades: response<Especialidades>;
  obrasocial: any;
  setOpenForm: any;
  paciente: string;
  getTurnos: any;
}) {
  const [obrasocialSeleccionada, setObrasocialSeleccionada] = useState<any>("");
  const [openModal, setOpenModal] = useState<{ open: boolean; data: any }>({
    open: false,
    data: {
      medico: null,
      paciente: null,
      turno: null,
    },
  });
  const [idEspecialidad, setIdEspecialidad] = useState<string | null>("");
  const {
    fetchData,
    data: medicos,
    loading: loadingMedicos,
  } = useCRUD<any>(`medicos/findMedicosbyEspecialidad`);
  const { insert } = useCRUD<Turnos>("turnos");
  const [obrasocialesEncontradas, setObrasocialesEncontradas] = useState<any[]>(
    []
  );
  const [medicosWithOS, setMedicosWithOS] = useState<Medicos[]>([]);

  const submitTurnos = async (value: Turnos) => {};

  useEffect(() => {
    if (idEspecialidad) {
      fetchData(idEspecialidad);
    } else {
      setObrasocialSeleccionada(null);
      setObrasocialesEncontradas([]);
    }
  }, [idEspecialidad]);

  useEffect(() => {
    if (obrasocialSeleccionada !== "0") {
      let medicosWithOS = medicos.data.filter((medic: any) => {
        return medic.obrasocial.find((m: any) => {
          return m === obrasocialSeleccionada;
        });
      });

      setMedicosWithOS(medicosWithOS);
    } else {
      setMedicosWithOS(medicos.data);
    }
  }, [obrasocialSeleccionada]);

  useEffect(() => {
    let obrasocialesUnicas = Array.from(
      new Set(
        Array.isArray(medicos?.data) &&
          (medicos.data?.flatMap((medico) => medico.obrasocial) as any)
      )
    );

    obrasocialesUnicas = props.obrasocial?.data?.filter((os: ObraSocial) =>
      obrasocialesUnicas?.find((osUnica) => osUnica === os.id)
    );

    obrasocialesUnicas?.push({ id: "0", nombre: "Sin obra social" });

    setObrasocialesEncontradas(obrasocialesUnicas);
  }, [medicos.data]);

  const handleChangeOS = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setObrasocialSeleccionada(value);
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useForm<Turno>(
      { fecha: new Date(), especialidad: "", medico: "", paciente: "" },
      validateTurnos,
      submitTurnos
    );

  const getValueEspecialidad = (e: any) => {
    const { value } = e.target;
    if (value === "") setIdEspecialidad(null);
    else setIdEspecialidad(value);
    handleChange(e);
  };

  return (
    <React.Fragment>
      {loadingMedicos && <Loader />}
      {openModal.open && (
        <ModalTurno
          openModal={openModal}
          setOpenModal={setOpenModal}
          insert={insert}
          setOpenForm={props.setOpenForm}
          getTurnos={props.getTurnos}
        />
      )}
      <form className={`${styles.form} shadow-md rounded px-8 py-6`}>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {Array.isArray(props.especialidades.data) &&
            props.especialidades?.data?.length > 0 && (
              <Select
                name="especialidad"
                value={values.especialidad}
                onChange={getValueEspecialidad}
                onBlur={handleBlur}
                className={"bg-[#eeeeeec5]"}
                options={
                  props.especialidades.data as { id: string; nombre: string }[]
                }
                placeholder="Elegir especialidad"
              />
            )}
        </div>
        {medicos.data.length && obrasocialesEncontradas?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <Select
              name="obrasocial"
              value={obrasocialSeleccionada}
              onChange={handleChangeOS}
              className={"bg-[#eeeeeec5]"}
              options={
                obrasocialesEncontradas as { id: string; nombre: string }[]
              }
              placeholder="Elegir obra social"
            />
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {obrasocialesEncontradas?.length &&
        obrasocialSeleccionada &&
        Array.isArray(medicosWithOS) &&
        medicosWithOS.length > 0 ? (
          <div className={`${styles.medicosContainer}`}>
            {medicosWithOS.map((medico, index) => (
              <div
                className={`${styles.medicoCard}  shadow-md rounded py-2 px-4`}
                key={index}
                onClick={() =>
                  setOpenModal({
                    open: true,
                    data: {
                      medico: medico,
                      paciente: props.paciente,
                      turno: null,
                    },
                  })
                }
              >
                <p className="text-center">
                  {medico.usuario.nombre} {medico.usuario.apellido}
                </p>
                <div className={styles.diasAtencion}>
                  <span>Días de atención:</span>
                  {medico.diasAtencion?.map((dia: string, index: number) => (
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
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </form>
    </React.Fragment>
  );
}
