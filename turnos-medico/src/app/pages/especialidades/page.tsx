"use client";
import { Especialidades } from "./type";
import styles from "./especialidades.module.css";
import Loader from "../../../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { InsertEspecialidades } from "./InsertEspecialidades";
import useCRUD from "@/hooks/useCrud";
import { DataEspecialidades } from "./DataEspecialidades";

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
    <>
      <div className="overflow-auto">
        <div>
          <h1 className="font-sans text-3xl text-center p-10">
            {openForm
              ? dataUpdate
                ? "Editar especialidad"
                : "Registrar especialidad"
              : "Lista de Especialidades"}
          </h1>
        </div>
        {loadingEspecialidades && <Loader />}
        {!openForm && (
          <DataEspecialidades
            especialidades={especialidades}
            setDataUpdate={setDataUpdate}
            setOpenForm={setOpenForm}
          />
        )}
        <div className="overflow-auto">
          {openForm && (
            <InsertEspecialidades
              initialValues={dataUpdate}
              isUpdating={dataUpdate ? true : false}
              setOpenForm={setOpenForm}
              especialidad={dataUpdate}
              insert={insert}
              update={update}
              remove={remove}
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
      </div>
    </>
  );
}
