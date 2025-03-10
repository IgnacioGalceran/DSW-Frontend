"use client";
import React, { useEffect, useState } from "react";
import { Turnos } from "./type";
import Loader from "../../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import InsertTurnos from "./CreateTurnos";
import useCRUD from "@/hooks/useCrud";
import { Especialidades } from "../../pages/especialidades/type";
import { useSelector } from "react-redux";
import moment from "moment";
import styles from "./turnos.module.css";
import Confirma from "@/components/Confirmacion";
import { ObraSocial } from "@/app/pages/obrasocial/type";
import ModalTurno from "./ModalTurno";
import { Medicos } from "@/app/pages/medicos/type";
import { Pacientes } from "@/app/pages/pacientes/type";

export default function ListaTurnos() {
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const [idTurno, setIdTurno] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const { id } = useSelector((state: any) => state.auth);
  const {
    fetchData: getEspecialidades,
    data: especialidades,
    loading: loadingEspecialidades,
  } = useCRUD<Especialidades>("especialidades/findEspecialidadesWithMedicos");
  const {
    fetchData: getObrasocial,
    data: obrasocial,
    loading: loadingObrasociales,
  } = useCRUD<ObraSocial>(`obrasocial`);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const {
    fetchData,
    remove,
    update,
    insert,
    loading: loadingT,
  } = useCRUD<Turnos>(`turnos`);
  const {
    fetchData: getTurnos,
    data: turnos,
    loading: loadingTurnos,
  } = useCRUD<Turnos>(`turnos/findTurnosByPaciente`);
  const [openModalTurnos, setOpenModalTurnos] = useState<{
    open: boolean;
    data: {
      medico: Medicos | null;
      paciente: Pacientes | null;
      turno: Turnos | null;
    };
  }>({
    open: false,
    data: { medico: null, paciente: null, turno: null },
  });

  useEffect(() => {
    getEspecialidades();
    getObrasocial();
  }, []);

  useEffect(() => {
    getTurnos(id);
  }, [id]);

  const confirmaDelete = async (id: string) => {
    setOpenConfirma(true);
    setIdTurno(id);
    setMessage("¿Está seguro que quiere borrar el turno?");
  };

  const handleDelete = async () => {
    if (idTurno) await remove(idTurno);
    setOpenConfirma(false);
    setIdTurno(null);
    getTurnos(id);
  };

  const handleEdit = (turno: Turnos) => {
    setOpenModalTurnos({
      open: true,
      data: { medico: turno.medico, paciente: turno.paciente, turno: turno },
    });
  };

  return (
    <React.Fragment>
      {(loadingEspecialidades ||
        loadingTurnos ||
        loadingObrasociales ||
        loadingT) && <Loader />}
      {openConfirma && (
        <Confirma
          open={openConfirma}
          setOpenConfirma={setOpenConfirma}
          message={message}
          handleConfirma={handleDelete}
        />
      )}
      {openModalTurnos && (
        <ModalTurno
          openModal={openModalTurnos}
          setOpenModal={setOpenModalTurnos}
          insert={insert}
          update={update}
          setOpenForm={setOpenForm}
          getTurnos={getTurnos}
        />
      )}
      <div className={styles.turnosContainer}>
        {!openForm && (
          <React.Fragment>
            <div className={styles.container}>
              <h1 className={`${styles.title} text-gray-900 text-2xl m-2`}>
                Lista de turnos
              </h1>
              <div className={styles.calendar}>
                {Array.isArray(turnos.data) && turnos.data?.length ? (
                  turnos.data?.map((turno, index) => {
                    let date = moment(turno.fecha).locale("es");

                    return (
                      <div className={styles.turnoCard} key={index}>
                        <div>{date.format("MMMM")}</div>
                        <div>{date.format("dddd")}</div>
                        <div>{date.format("DD")}</div>
                        <div>
                          {turno.inicio} - {turno.fin}
                        </div>
                        <div>{turno.medico?.especialidad?.nombre}</div>
                        <div>
                          Medico: {turno.medico?.usuario?.nombre}{" "}
                          {turno.medico?.usuario?.apellido}
                        </div>
                        <div className={styles.actions}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className={styles.trash}
                            onClick={() => confirmaDelete(turno.id)}
                          />
                          <FontAwesomeIcon
                            icon={faEdit}
                            className={styles.edit}
                            onClick={() => handleEdit(turno)}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h2>Aún no posee turnos</h2>
                )}
              </div>
            </div>
          </React.Fragment>
        )}

        <FontAwesomeIcon
          icon={openForm ? faArrowLeft : faPlus}
          className={openForm ? styles.hide : styles.insert}
          onClick={() => setOpenForm(!openForm)}
        />
        {openForm && (
          <InsertTurnos
            especialidades={especialidades}
            obrasocial={obrasocial}
            setOpenForm={setOpenForm}
            paciente={id}
            getTurnos={getTurnos}
          />
        )}
      </div>
    </React.Fragment>
  );
}
