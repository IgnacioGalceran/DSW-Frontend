"use client";
import React, { useEffect, useState } from "react";
import { Turnos } from "./type";
import Loader from "../../../components/Loader";
import useCRUD from "@/hooks/useCrud";
import { Especialidades } from "../../pages/especialidades/type";
import { useSelector } from "react-redux";
import moment from "moment";
import styles from "./turnos.module.css";

export default function ListaTurnos() {
  const { id } = useSelector((state: any) => state.auth);
  const { update, remove, loading: loadingT } = useCRUD<Turnos>(`turnos`);
  const {
    fetchData: getTurnos,
    data: turnos,
    loading: loadingTurnos,
  } = useCRUD<Turnos>(`turnos/findTurnosByMedico/${id}`);

  useEffect(() => {
    getTurnos();
  }, []);

  return (
    <React.Fragment>
      {(loadingTurnos) && <Loader />}
      <div
        className={
          styles.turnosContainer
        }
      >
        
          <React.Fragment>
            <div className={styles.container}>
              <h1 className={`${styles.title} text-gray-900 text-2xl m-2`}>
                Lista de turnos
              </h1>
              <div className={styles.calendar}>
                {turnos.data?.length ?
                  turnos.data?.map((turno, index) => {
                    let date = moment(turno.fecha).locale("es");

                    return (
                      <div className={styles.turnoCard} key={index}>
                        <div>{date.format("MMMM")}</div>
                        <div>{date.format("dddd")}</div>
                        <div>{date.format("DD")}</div>
                        <div>{turno.rango}</div>
                        <div>Paciente: {turno.paciente.usuario.nombre} {turno.paciente.usuario.apellido}</div>
                      </div>
                    );
                  }) : <h2>Aún no posee turnos</h2>}
              </div>
            </div>
          </React.Fragment>

      </div>
    </React.Fragment>
  );
}
