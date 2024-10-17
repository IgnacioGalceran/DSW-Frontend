"use client";
import { Especialidades } from "./type";
import useFind from "@/hooks/useFind";
import Loader from "../../../components/Loader";
import styles from "./especialidades.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPencil,
  faPencilSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { InsertEspecialidades } from "./InsertEspecialidades";
import useCRUD from "@/hooks/useCrud";

export default function ListaEspecialidades() {
  const { data: especialidades, loading } =
    useFind<Especialidades>("especialidades");

  // const { update } = useCRUD<Especialidades>("especialidades");

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [selectedEspecialidad, setSelectedEspecialidad] =
    useState<Especialidades | null>(null);

  const handleClickInsert = () => {
    console.log(openForm);
    setSelectedEspecialidad(null);
    setOpenForm(!openForm);
  };

  const handleClickUpdate = (esp: Especialidades) => {
    setSelectedEspecialidad(esp);
    setOpenForm(!openForm);
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
                  <div className="grid grid-cols-2">
                    <p className="capitalize text-sx font-semibold  inline m-2">
                      {especialidad.nombre}
                    </p>
                    <FontAwesomeIcon
                      icon={faPencil}
                      className="block h-5 w-5 mt-2 mb-2 mr-2 ml-auto "
                      onClick={() => handleClickUpdate(especialidad)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="overflow-auto">
          {openForm && (
            <InsertEspecialidades especialidad={selectedEspecialidad} />
          )}
          {
            <FontAwesomeIcon
              icon={openForm ? faArrowLeft : faPlus}
              className={openForm ? styles.hide : styles.insert}
              onClick={() => handleClickInsert()}
            />
          }
        </div>
      </div>
    </>
  );
}
