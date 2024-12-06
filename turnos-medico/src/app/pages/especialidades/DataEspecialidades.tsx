import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Especialidades } from "./type";
import styles from "./especialidades.module.css";
import { faEdit, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Confirma from "@/components/Confirmacion";

export const DataEspecialidades = (props: {
  especialidades: response<Especialidades>;
  setDataUpdate: (e: Especialidades) => void;
  setOpenForm: any;
}) => {
  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 px-6 my-3"
      >
        {Array.isArray(props.especialidades.data) &&
          props.especialidades.data?.map((especialidad: Especialidades) => (
            <li
              className={`rounded-md mx-2 p-4 ${styles.sombra}`}
              key={especialidad.id}
            >
              <div className="grid grid-cols-2">
                <p className="capitalize text-sx inline m-2">
                  {especialidad.nombre}
                </p>
                <FontAwesomeIcon
                  icon={faEdit}
                  className="block h-5 w-5 mt-2 mb-2 mr-2 ml-auto "
                  onClick={() => {
                    props.setDataUpdate(especialidad);
                    props.setOpenForm(true);
                  }}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
