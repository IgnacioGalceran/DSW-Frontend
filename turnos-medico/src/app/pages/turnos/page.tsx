"use client";
import { Turnos } from "./type";
import useFind from "@/hooks/useFind";
import Loader from "../../../components/Loader";
import styles from "./turnos.module.css";

export default function ListaTurnos() {
  const { data: turnos, loading } = useFind<Turnos>("turnos");

  return (
    <>
      <div className="overflow-auto">
        <div>
          <h1 className="font-sans text-3xl text-center p-10">Turnos</h1>
        </div>
        {loading && <Loader />}
        <div>
          <ul role="list" className="flex justify-center flex-row flex-wrap">
            {turnos.data?.map((turno: Turnos) => (
              <li
                className={`w-4/5 md:w-1/4 py-5 rounded-md m-2 p-4 ${styles.sombra}`}
                key={turno.id}
              >
                <div className="min-w-0 gap-x-4">
                  <div className="min-w-0">
                    {/* <p className="capitalize text-sm font-semibold leading-6 text-gray-900">
                      {turno.fecha}
                    </p> */}
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
