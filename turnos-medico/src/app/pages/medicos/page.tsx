"use client";
import Loader from "../../../components/Loader";
import { useEffect, useState } from "react";
import InsertMedicos from "./InsertMedicos";
import { DataMedico } from "./DataMedico";
import { Medicos } from "./type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Especialidades } from "../especialidades/type";
import { ObraSocial } from "../obrasocial/type";
import React from "react";
import useCRUD from "@/hooks/useCrud";
import styles from "./medicos.module.css";

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
  const {
    fetchData: getOS,
    data: obrasocial,
    loading: loadingOS,
  } = useCRUD<ObraSocial>("obrasocial");
  const [dataUpdate, setDataUpdate] = useState<Medicos | undefined>(undefined);
  const [openForm, setOpenForm] = useState<boolean>(false);

  useEffect(() => {
    getMedicos();
    getEspecialidades();
    getOS();
  }, []);

  return (
    <React.Fragment>
      {(loading || loadingEspecialidades || loadingOS) && <Loader />}
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
            obrasSociales={obrasocial.data as ObraSocial[]}
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
