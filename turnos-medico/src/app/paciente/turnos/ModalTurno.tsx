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
  update,
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
  const {
    fetchData: getTurnos,
    data: turnos,
    loading: loadingTurnos,
  } = useCRUD<Turnos>(`turnos/findTurnosOcupadosByMedicoByDates`);

  useEffect(() => {
    if (openModal.data?.medico?.id && date.startDate && date.endDate)
      getTurnos(
        `${openModal?.data?.medico?.id}?startDate=${date.startDate}&endDate=${date.endDate}`
      );
  }, [date.startDate, date.endDate, openModal.data?.medico?.id]);

  const isBeforeToday = (): boolean => {
    if (moment(date.startDate).startOf("day") > moment().startOf("day"))
      return false;
    else return true;
  };

  console.log(turnos);

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

  const doesAttend = (start: Date, end: Date, index: number) => {
    let attend!: boolean;
    let dia = moment(start).add(index, "days").format("yyyy-MM-DD");

    let checkearIndisponibilidades =
      openModal.data.medico?.indisponibilidades?.find((i) => {
        return i.toString().slice(0, 10) === dia.toString();
      });

    if (checkearIndisponibilidades) {
      attend = false;
    } else {
      let checkearDiasAtencion = openModal.data.medico?.diasAtencion?.find(
        (dia) => {
          return (
            dia.toLowerCase().trim() ===
            moment(date.startDate)
              .add(index, "days")
              .locale("es")
              .format("dddd")
          );
        }
      );

      if (checkearDiasAtencion) attend = true;
    }

    return attend;
  };

  function generateHours(
    horaInicial: string | undefined,
    horaFinal: string | undefined,
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
        Array.isArray(turnos.data) &&
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
      medico: openModal.data?.medico?.id,
      paciente: id,
      inicio,
      fin,
      fecha: new Date(fecha),
    });
    setOpenConfirma(true);
  };

  const handleSubmit = async () => {
    if (body)
      if (openModal.data?.turno) {
        await update(openModal.data?.turno?.id, body);
      } else {
        await insert(body);
      }
    setOpenForm(false);
    refreshTurnos(body?.paciente);
    setOpenConfirma(false);
    setBody(null);
    setOpenModal({ open: false, data: null });
  };

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
            <div className={modal.containerTitle}>
              <h1 className={modal.title}>
                Médico: {openModal.data?.medico?.usuario?.nombre}{" "}
                {openModal.data?.medico?.usuario?.apellido}
              </h1>
              <h2 className={modal.subtitle}>
                Especialidad: {openModal.data?.medico?.especialidad?.nombre}
              </h2>
            </div>
            <div className={modal.turnoContainer}>
              {array.map((a, indexDay) => {
                let attend = doesAttend(date.startDate, date.endDate, indexDay);
                let ranges!: string[];
                const now = moment();
                if (attend) {
                  ranges = generateHours(
                    openModal.data?.medico?.horaDesde,
                    openModal.data?.medico?.horaHasta,
                    date.startDate,
                    indexDay,
                    now
                  );
                }

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
                        {ranges.length > 0 ? (
                          ranges.map((range, index) => (
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
                          ))
                        ) : (
                          <p className="text-white-700 text-l p-3 font-bold normal-case">
                            Ya no hay horarios disponibles
                          </p>
                        )}
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
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={modal.hide}
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default ModalTurno;
