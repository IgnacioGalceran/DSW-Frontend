"use client";
import useFind from "../hooks/useFind";
import styles from "./medicos.module.css";

export default function ListaMedicos() {
  const { data: medicos } = useFind<Medicos>("medicos");
  if (!medicos) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="h-screen">
        <div>
          <h1 className="font-sans text-3xl text-center p-10">
            Lista de Médicos
          </h1>
        </div>
        <div className="flex justify-center">
          <ul role="list">
            {medicos.data?.map((medico: Medicos) => (
              <li
                className={`flex justify-between gap-x-6 py-5 rounded-md m-2 p-4 ${styles.sombra}`}
                key={medico.id}
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
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
                    {"Especialidad: " + medico.especialidad.nombre}
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
