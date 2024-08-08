"use client";
import { Pacientes } from "./type";
import useFind from "@/hooks/useFind";
import Loader from "../../../components/Loader";
import styles from "./pacientes.module.css";

export default function ListaPacientes() {
  const { data: pacientes, loading } = useFind<Pacientes>("pacientes");

  return (
    <>
      <div className="overflow-auto">
        <div>
          <h1 className="font-sans text-3xl text-center p-10">
            Lista de Pacientes
          </h1>
        </div>
        {loading && <Loader />}
        <div>
          <ul role="list" className="flex justify-center flex-row flex-wrap">
            {pacientes.data?.map((paciente: Pacientes) => (
              <li
                className={`w-4/5 md:w-1/4 py-5 rounded-md m-2 p-4 ${styles.sombra}`}
                key={paciente.id}
              >
                <div className="min-w-0 gap-x-4">
                  <div className="min-w-0">
                    <p className="capitalize text-sm font-semibold leading-6 text-gray-900">
                      {paciente.nombre + " " + paciente.apellido}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {"Dni: " + paciente.dni}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
