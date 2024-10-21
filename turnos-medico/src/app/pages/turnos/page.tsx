"use client";
import React, { useEffect, useState } from "react";
import { Turnos } from "./type";
import Loader from "../../../components/Loader";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import InsertTurnos from "./CreateTurnos";
import useCRUD from "@/hooks/useCrud";
import { Especialidades } from "../especialidades/type";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./turnos.module.css";

export default function ListaTurnos() {
  const { id } = useSelector((state: any) => state.auth);
  const {
    fetchData: getEspecialidades,
    data: especialidades,
    loading: loadingEspecialidades,
  } = useCRUD<Especialidades>("especialidades");
  const [openForm, setOpenForm] = useState<boolean>(false);
  const {
    fetchData: getTurnos,
    data: turnos,
    loading: loadingTurnos,
  } = useCRUD<Turnos>(`turnos/findTurnosByPaciente/${id}`);
  const [date, setDate] = useState<Date | null>(new Date());

  useEffect(() => {
    getEspecialidades();
    getTurnos();
  }, []);

  console.log(turnos);

  return (
    <React.Fragment>
      {loadingEspecialidades && <Loader />}
      <div
        className={
          openForm ? styles.turnosContainerSinImagen : styles.turnosContainer
        }
      >
        {!openForm && (
          <React.Fragment>
            <div className={styles.container}>
              <div className={styles.calendar}>
                <Calendar value={date} />
              </div>
              <div className={styles.info}></div>
            </div>
          </React.Fragment>
        )}

        <FontAwesomeIcon
          icon={openForm ? faArrowLeft : faPlus}
          className={openForm ? styles.hide : styles.insert}
          onClick={() => setOpenForm(!openForm)}
        />
      </div>
      {openForm && <InsertTurnos especialidades={especialidades} />}
    </React.Fragment>
  );
}
