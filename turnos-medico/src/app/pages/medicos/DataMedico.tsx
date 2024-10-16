"use client";
import useFind from "@/hooks/useFind";
import { Medicos } from "./type";
import styles from "./medicos.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Confirma from "@/components/Confirmacion";

export const DataMedico = (props: {
  medicos: response<Medicos>;
  remove: any;
  setDataUpdate: any;
  setOpenForm: any;
}) => {
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const confirmaDelete = async (id: string) => {
    setOpenConfirma(true);
    setId(id);
    setMessage("¿Está seguro que quiere borrar el médico?");
  };

  const handleDelete = async () => {
    if (id) await props.remove(id);
  };

  return (
    <>
      <ul role="list" className="flex justify-center flex-row flex-wrap">
        {openConfirma && (
          <Confirma
            open={openConfirma}
            setOpenConfirma={setOpenConfirma}
            message={message}
            handleConfirma={handleDelete}
          />
        )}
        {props.medicos.data?.map((medico: Medicos) => (
          <li
            className={`md:w-1/5 rounded-md m-2 ${styles.medicoCard}`}
            key={medico.usuario.id}
          >
            <div>
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
                <p className="mt-1 text-xs text-gray-500">
                  {medico.especialidad
                    ? "Especialidad: " + medico.especialidad?.nombre
                    : "Especialidad: Sin especialidad"}
                </p>
              </div>
            </div>
            <div className={styles.acciones}>
              <FontAwesomeIcon
                icon={faEdit}
                className={styles.edit}
                onClick={() => {
                  props.setDataUpdate(medico);
                  props.setOpenForm(true);
                }}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.trash}
                onClick={() =>
                  medico.usuario.id && confirmaDelete(medico.usuario.id)
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
