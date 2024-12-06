"use client";
import Loader from "../../../components/Loader";
import { useEffect, useState } from "react";
import InsertMedicos from "./InsertMedicos";
import { DataMedico } from "./DataMedico";
import { Medicos } from "./type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./medicos.module.css";
import useCRUD from "@/hooks/useCrud";
import { Especialidades } from "../especialidades/type";
import React from "react";

export default function ListaMedicos() {
  const {
    fetchData: getMedicos,
    data: medicos,
    loading,
    insert,
    update,
    remove,
  } = useCRUD<Medicos>("medicos");

  const {
    fetchData: getEspecialidades,
    data: especialidades,
    loading: loadingEspecialidades,
  } = useCRUD<Especialidades>("especialidades");

  const [dataUpdate, setDataUpdate] = useState<Medicos | undefined>(undefined);

  const [openForm, setOpenForm] = useState<boolean>(false);

  useEffect(() => {
    getMedicos();
    getEspecialidades();
  }, []);

  return (
    <React.Fragment>
      {(loading || loadingEspecialidades) && <Loader />}
      <div className="overflow-auto">
        <div>
          <h1 className="text-2xl text-3xl text-center p-4">
            {openForm
              ? dataUpdate
                ? "Actualización de Médico"
                : "Registrar Médico"
              : "Lista de Médicos"}
          </h1>
        </div>
        {!openForm && (
          <DataMedico
            medicos={medicos}
            remove={remove}
            setDataUpdate={setDataUpdate}
            setOpenForm={setOpenForm}
          />
        )}
        {openForm && (
          <InsertMedicos
            initialValues={dataUpdate}
            isUpdating={dataUpdate ? true : false}
            setOpenForm={setOpenForm}
            especialidades={especialidades.data as Especialidades[]}
            insert={insert}
            update={update}
          />
        )}
        {
          <FontAwesomeIcon
            icon={openForm ? faArrowLeft : faPlus}
            className={openForm ? styles.hide : styles.insert}
            onClick={() => {
              setOpenForm(!openForm);
              setDataUpdate(undefined);
            }}
          />
        }
      </div>
    </React.Fragment>
  );
}
