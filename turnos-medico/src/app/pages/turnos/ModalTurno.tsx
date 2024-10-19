"use client";
import React, { useEffect, useState } from "react";
import { ModalTurnos } from "@/types/ModalTurnos";
import modal from "./modalTurno.module.css";
import useCRUD from "@/hooks/useCrud";
import { Turnos } from "./type";
import Loader from "@/components/Loader";
import moment from "moment";
import "moment/locale/es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const ModalTurno: React.FC<ModalTurnos> = ({
  openModal,
  setOpenModal,
  insert,
}) => {
  const { id } = useSelector((state: any) => state.auth);
  const array = new Array(3).fill(null);
  const [date, setDate] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
  });
  const {
    fetchData: getTurnos,
    data: turnos,
    loading: loadingTurnos,
  } = useCRUD<Turnos>(
    `turnos/findTurnosOcupadosByMedicoByDates/${openModal?.data?.id}?startDate=${date.startDate}&endDate=${date.endDate}`
  );

  useEffect(() => {
    getTurnos();
  }, [date.startDate, date.endDate]);

  console.log(turnos);

  const handleDateBack = () => {
    setDate({
      startDate: new Date(date.startDate.setDate(date.startDate.getDate() - 3)),
      endDate: new Date(date.endDate.setDate(date.endDate.getDate() - 3)),
    });
  };

  const handleDateForward = () => {
    setDate({
      startDate: new Date(date.startDate.setDate(date.startDate.getDate() + 3)),
      endDate: new Date(date.endDate.setDate(date.endDate.getDate() + 3)),
    });
  };

  const doesAttend = (dia: string) => {
    let attend: boolean | undefined = openModal.data.diasAtencion?.some(
      (diaAtencion) =>
        diaAtencion.toLowerCase().trim() === dia.toLowerCase().trim()
    );

    return attend;
  };

  function generarHoras(horaInicial: string, horaFinal: string): string[] {
    const horas = [];
    const inicio = moment(horaInicial, "HH:mm");
    const fin = moment(horaFinal, "HH:mm");

    while (inicio.isBefore(fin) || inicio.isSame(fin)) {
      const desde = inicio.format("HH:mm");
      inicio.add(30, "minutes");
      const hasta = inicio.format("HH:mm");

      horas.push(`${desde} - ${hasta}`);
    }

    return horas;
  }

  const handleHourClick = async (range: string, fecha: string) => {
    let body = {
      medico: openModal.data.id,
      paciente: id,
      rango: range,
      fecha: new Date(fecha),
    };

    console.log(body);
    await insert(body);
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      {loadingTurnos && <Loader />}
      {openModal.open && (
        <div
          className={modal.container}
          onClick={() => setOpenModal({ open: false, data: null })}
        >
          <div
            className={modal.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={modal.closeButton}
              onClick={() => setOpenModal({ open: false, data: null })}
            >
              x
            </button>
            <div className={modal.turnoContainer}>
              {array.map((a, indexDay) => {
                let attend = doesAttend(
                  moment(date.startDate)
                    .add(indexDay, "days")
                    .locale("es")
                    .format("dddd")
                );

                return (
                  <div
                    className={`${modal.dia} ${attend && modal.can}`}
                    key={indexDay}
                  >
                    <h2 className={modal.diaNombre}>
                      {moment(date.startDate)
                        .add(indexDay, "days")
                        .locale("es")
                        .format("ddd D")}
                    </h2>
                    {attend && (
                      <React.Fragment>
                        {openModal.data.horaDesde &&
                          openModal.data.horaHasta &&
                          generarHoras(
                            openModal.data.horaDesde,
                            openModal.data.horaHasta
                          ).map((range, index) => (
                            <div
                              key={index}
                              className={modal.range}
                              onClick={() =>
                                handleHourClick(
                                  range,
                                  moment(date.startDate)
                                    .add(indexDay, "days")
                                    .locale("es")
                                    .format("Y/M/D")
                                )
                              }
                            >
                              {range}
                            </div>
                          ))}
                      </React.Fragment>
                    )}
                  </div>
                );
              })}
            </div>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={modal.left}
              onClick={handleDateBack}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              className={modal.right}
              onClick={handleDateForward}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ModalTurno;
