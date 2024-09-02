"use client";
import useFind from "@/hooks/useFind";
import { Medicos } from "./type";
import styles from "./medicos.module.css";
import { useEffect, useState } from "react";

export const DataMedico = (props: { medicos: response<Medicos> }) => {
  const [filter, setFilter] = useState<Medicos[]>([]);

  return (
    <>
      <ul role="list" className="flex justify-center flex-row flex-wrap">
        {props.medicos.data?.map((medico: Medicos) => (
          <li
            className={`w-4/5 md:w-1/4 py-5 rounded-md m-2 p-4 ${styles.sombra}`}
            key={medico.usuario.id}
          >
            <div className="min-w-0 gap-x-4">
              <div className="min-w-0">
                <p className="capitalize text-sm font-semibold leading-6 text-gray-900">
                  {medico.usuario.nombre + " " + medico.usuario.apellido}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {"Matrícula: " + medico.matricula}
                </p>
              </div>
            </div>
            <div className=" sm:flex sm:flex-col ">
              <p className="text-sm leading-6 text-gray-900"></p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                {medico.especialidad
                  ? "Especialidad: " + medico.especialidad?.nombre
                  : "Especialidad: Sin especialidad"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
