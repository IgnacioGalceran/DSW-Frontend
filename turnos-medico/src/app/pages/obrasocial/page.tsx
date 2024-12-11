"use client";
import Loader from "../../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { DataObrasocial } from "./DataObrasocial";
import { ObraSocial } from "./type";
import React from "react";
import InsertObrasSociales from "./ObrasSocialesInsert";
import useCRUD from "@/hooks/useCrud";
import styles from "./obrasocial.module.css";

export default function ListaEspecialidades() {
  const {
    fetchData: getObrasSociales,
    data: obrasSociales,
    loading,
    insert,
    update,
    remove,
  } = useCRUD<ObraSocial>("obrasocial");
  const [dataUpdate, setDataUpdate] = useState<ObraSocial | undefined>(
    undefined
  );
  const [openForm, setOpenForm] = useState<boolean>(false);

  useEffect(() => {
    getObrasSociales();
  }, []);

  return (
    <React.Fragment>
      {loading && <Loader />}
      <div className="overflow-auto">
        <div>
          <h1 className="text-2xl text-3xl text-center p-4">
            {openForm
              ? dataUpdate
                ? "Actualización de Obras Sociales"
                : "Cargar Obra Social"
              : "Lista de Obras Sociales"}
          </h1>
        </div>
        {!openForm && (
          <DataObrasocial
            obrasSociales={obrasSociales}
            remove={remove}
            setDataUpdate={setDataUpdate}
            setOpenForm={setOpenForm}
          />
        )}
        {openForm && (
          <InsertObrasSociales
            isUpdating={dataUpdate ? true : false}
            setOpenForm={setOpenForm}
            initialValues={dataUpdate}
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
