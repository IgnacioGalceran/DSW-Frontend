"use client";
import { Especialidades } from "./type";
import useFind from "@/hooks/useFind";
import Loader from "../../../components/Loader";
import styles from "./especialidades.module.css";
import { InfoEspecialidad } from "@/components/InfoEspecialidad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPencil,
  faPencilSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { InsertEspecialidades } from "./InsertEspecialidades";

export default function ListaMedicos() {
  const { data: especialidades, loading } =
    useFind<Especialidades>("especialidades");

  const [openForm, setOpenForm] = useState<boolean>(false);

  const handleClick = (e: any) => {
    console.log(e.target);
  };

  return (
    <>
      <div className="overflow-auto">
        <div>
          <h1 className="font-sans text-3xl text-center p-10">
            {openForm ? "Cargar especialidad" : "Lista de Especialidades"}
          </h1>
        </div>
        {loading && <Loader />}
        {!openForm && (
          <div>
            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 px-6"
            >
              {especialidades.data?.map((especialidad: Especialidades) => (
                <li
                  className={`rounded-md mx-2 p-4 ${styles.sombra}`}
                  key={especialidad.id}
                >
                  <div className="grid grid-cols-2" onClick={handleClick}>
                    <p className="capitalize text-sx font-semibold  inline m-2">
                      {especialidad.nombre}
                    </p>
                    <FontAwesomeIcon
                      icon={faPencil}
                      className="block h-5 w-5 mt-2 mb-2 mr-2 ml-auto "
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="overflow-auto">
          {openForm && <InsertEspecialidades />}
          {
            <FontAwesomeIcon
              icon={openForm ? faArrowLeft : faPlus}
              className={openForm ? styles.hide : styles.insert}
              onClick={() => setOpenForm(!openForm)}
            />
          }
        </div>
      </div>
    </>
  );
}
