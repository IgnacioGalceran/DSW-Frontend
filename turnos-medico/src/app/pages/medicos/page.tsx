"use client";
import useFind from "@/hooks/useFind";
import styles from "./medicos.module.css";
import Loader from "../../../components/Loader";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";

export default function ListaMedicos() {
  const { data: medicos, loading } = useFind<Medicos>("medicos");

  return (
    <>
      <div className="h-screen overflow-auto max-h-dvh">
        <div>
          <h1 className="font-sans text-3xl text-center p-10">
            Lista de Médicos
          </h1>
        </div>
        {loading && <Loader />}
        <div>
          <ul role="list" className="flex justify-center flex-row flex-wrap">
            {medicos.data?.map((medico: Medicos) => (
              <li
                className={`w-4/5 md:w-1/4 py-5 rounded-md m-2 p-4 ${styles.sombra}`}
                key={medico.id}
              >
                <div className="min-w-0 gap-x-4">
                  <div className="min-w-0">
                    <p className="capitalize text-sm font-semibold leading-6 text-gray-900">
                      {medico.nombre + " " + medico.apellido}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {"Matrícula: " + medico.matricula}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {"Teléfono: " + medico.telefono}
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
        </div>
      </div>
    </>
  );
}
