"use client";
import React, { useEffect, useState } from "react";
import { ModalTurnos } from "@/types/ModalTurnos";
import modal from "./modalTurno.module.css";
import useCRUD from "@/hooks/useCrud";
import { Turnos } from "./type";
import Loader from "@/components/Loader";
import moment, { Moment } from "moment";
import "moment/locale/es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Confirma from "@/components/Confirmacion";

const ModalTurno: React.FC<ModalTurnos> = ({
  openModal,
  setOpenModal,
  insert,
  setOpenForm,
  getTurnos: refreshTurnos,
}) => {
  const { id } = useSelector((state: any) => state.auth);
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const array = new Array(3).fill(null);
  const [body, setBody] = useState<{
    medico: string | undefined;
    paciente: string | undefined;
    inicio: string | undefined;
    fin: string | undefined;
    fecha: Date | undefined;
  } | null>(null);
  const [date, setDate] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
  });
  const now = new Date();
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

  const isBeforeToday = (): boolean => {
    if (moment(date.startDate).startOf("day") > moment().startOf("day"))
      return false;
    else return true;
  };

  const handleDateBack = () => {
    if (!isBeforeToday())
      setDate({
        startDate: new Date(
          date.startDate.setDate(date.startDate.getDate() - 3)
        ),
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

  console.log(turnos.data);

  function generateHours(
    horaInicial: string,
    horaFinal: string,
    startDate: Date,
    index: number,
    now: moment.Moment
  ): string[] {
    const hours = [];
    let init;
    let end;

    if (
      startDate.toString().slice(0, 10) === now.toString().slice(0, 10) &&
      index === 0
    ) {
      init = now.clone().add(3, "hours").startOf("hour");
      end = moment(horaFinal, "HH:mm").startOf("hour");
    } else {
      init = moment(horaInicial, "HH:mm").startOf("hour");
      end = moment(horaFinal, "HH:mm").startOf("hour");
    }

    while (init.isBefore(end) || init.isSame(end)) {
      const from = init.format("HH:mm");
      const to = init.clone().add(30, "minutes").format("HH:mm");

      if (
        !turnos?.data?.find(
          (turno) => turno.inicio === from && turno.fin === to
        )
      ) {
        hours.push(`${from} - ${to}`);
      }

      init.add(30, "minutes");
    }

    return hours;
  }

  const handleHourClick = async (range: string, fecha: string) => {
    let inicio = range.split("-")[0].trim();
    let fin = range.split("-")[1].trim();
    setBody({
      medico: openModal.data.id,
      paciente: id,
      inicio,
      fin,
      fecha: new Date(fecha),
    });
    setOpenConfirma(true);
  };

  const handleSubmit = async () => {
    if (body) await insert(body);
    setOpenForm(false);
    refreshTurnos();
    setBody(null);
    setOpenModal({ open: false, data: null });
  };

  console.log(body);

  return (
    <React.Fragment>
      {loadingTurnos && <Loader />}
      {openConfirma && (
        <Confirma
          message={`Confirmar turno el día ${body?.fecha
            ?.toISOString()
            .slice(0, 10)} en el horario ${body?.inicio} - ${body?.fin}`}
          open={openConfirma}
          setOpenConfirma={setOpenConfirma}
          handleConfirma={handleSubmit}
        />
      )}
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
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className={modal.containerMes}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className={
                  isBeforeToday() ? `${modal.left} text-gray-200` : modal.left
                }
                onClick={handleDateBack}
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                className={modal.right}
                onClick={handleDateForward}
              />
              <h2 className={`${modal.mes} text-xl text-gray-700`}>
                {moment(date.endDate).locale("es").format("MMMM Y")}
              </h2>
            </div>
            <div className={modal.turnoContainer}>
              {array.map((a, indexDay) => {
                let attend = doesAttend(
                  moment(date.startDate)
                    .add(indexDay, "days")
                    .locale("es")
                    .format("dddd")
                );
                const now = moment();
                return (
                  <div
                    className={`${modal.dia} ${attend && modal.can}`}
                    key={indexDay}
                  >
                    <h2 className={`${modal.diaNombre} shadow`}>
                      {moment(date.startDate)
                        .add(indexDay, "days")
                        .locale("es")
                        .format("ddd D")}
                    </h2>
                    {attend ? (
                      <React.Fragment>
                        {openModal.data.horaDesde &&
                          openModal.data.horaHasta &&
                          generateHours(
                            openModal.data.horaDesde,
                            openModal.data.horaHasta,
                            date.startDate,
                            indexDay,
                            now
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
                    ) : (
                      <p className="text-gray-700 text-l p-3 font-bold normal-case">
                        El médico no atiende este día
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ModalTurno;
