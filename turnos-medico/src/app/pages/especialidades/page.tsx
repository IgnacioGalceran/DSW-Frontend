"use client";
import { Especialidades } from "./type";
import styles from "./especialidades.module.css";
import Loader from "../../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import InsertEspecialidades from "./InsertEspecialidades";
import useCRUD from "@/hooks/useCrud";
import { DataEspecialidades } from "./DataEspecialidades";
import React from "react";

export default function ListaEspecialidades() {
  const {
    fetchData: getEspecialidades,
    data: especialidades,
    loading: loadingEspecialidades,
    insert,
    update,
    remove,
  } = useCRUD<Especialidades>("especialidades");
  const [dataUpdate, setDataUpdate] = useState<Especialidades | undefined>(
    undefined
  );
  const [openForm, setOpenForm] = useState<boolean>(false);

  useEffect(() => {
    getEspecialidades();
  }, []);

  return (
    <React.Fragment>
      {loadingEspecialidades && <Loader />}
      <div className="overflow-auto">
        <div>
          <h1 className="text-2xl text-3xl text-center p-4">
            {openForm
              ? dataUpdate
                ? "Actualización de Especialidad"
                : "Cargar Especialidad"
              : "Lista de Especialidades"}
          </h1>
        </div>
        {!openForm && (
          <DataEspecialidades
            especialidades={especialidades}
            remove={remove}
            setDataUpdate={setDataUpdate}
            setOpenForm={setOpenForm}
          />
        )}
        {openForm && (
          <InsertEspecialidades
            isUpdating={dataUpdate ? true : false}
            setOpenForm={setOpenForm}
            initialValues={dataUpdate}
            insert={insert}
            update={update}
          />
        )}
        {
          <FontAwesomeIcon
            id="insert-especialidad"
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
