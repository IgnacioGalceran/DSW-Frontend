"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/es";
import styles from "./turnos.module.css";
import Loader from "../../../components/Loader";
import useCRUD from "@/hooks/useCrud";

export default function ListaTurnos() {
  const { id } = useSelector((state: any) => state.auth);
  const {
    fetchData: getTurnos,
    data: turnos,
    loading: loadingTurnos,
  } = useCRUD(`turnos/findTurnosByMedico/${id}`, false);

  useEffect(() => {
    getTurnos();
  }, []);

  const groupTurnosByDay = (turnos: any) => {
    return turnos.reduce((acc: any, turno: any) => {
      const fecha = moment(turno.fecha).format("YYYY-MM-DD");
      if (!acc[fecha]) {
        acc[fecha] = [];
      }
      acc[fecha].push(turno);
      return acc;
    }, {});
  };

  const turnosGrouped = turnos?.data ? groupTurnosByDay(turnos.data) : null;

  return (
    <React.Fragment>
      {loadingTurnos && <Loader />}
      <div className={styles.calendar}>
        {Object?.keys(turnosGrouped)?.length > 0 ? (
          Object?.entries(turnosGrouped)?.map(([fecha, turnos]: any) => {
            const isToday = moment(fecha).isSame(moment(), "day");

            return (
              <div
                key={fecha}
                className={`${styles.diaContainer} ${
                  isToday ? styles.today : ""
                }`}
              >
                <div className={styles.diaTitulo}>
                  {moment(fecha).format("dddd, DD [de] MMMM [de] YYYY")}
                </div>
                <div className={styles.turnosPorDia}>
                  {turnos.map((turno: any, index: number) => (
                    <div className={styles.turnoCard} key={index}>
                      <div>
                        <strong>Horario:</strong> {turno.inicio} - {turno.fin}
                      </div>
                      <div>
                        <strong>Paciente:</strong>{" "}
                        {turno.paciente.usuario.nombre}{" "}
                        {turno.paciente.usuario.apellido}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noTurnos}>
            <h2>Aún no posee turnos asignados</h2>
            <img src="/assets/no-turnos.svg" alt="No hay turnos" />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
