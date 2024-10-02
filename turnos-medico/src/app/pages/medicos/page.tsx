"use client";

import useFind from "@/hooks/useFind";
import Loader from "../../../components/Loader";
import { useEffect, useState } from "react";
import InsertMedicos from "./InsertMedicos";
import { DataMedico } from "./DataMedico";
import { Medicos } from "./type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./medicos.module.css";
import useCRUD from "@/hooks/useCrud";

export default function ListaMedicos() {
  const {
    fetchData,
    data: medicos,
    loading,
    insert,
    update,
    remove,
  } = useCRUD<Medicos>("medicos");
  const [openForm, setOpenForm] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="overflow-auto">
        <div>
          <h1 className="font-sans text-3xl text-center p-10">
            {openForm ? "Registro de médico" : "Lista de Médicos"}
          </h1>
        </div>
        {!openForm && <DataMedico medicos={medicos} />}
        {openForm && <InsertMedicos />}
        {
          <FontAwesomeIcon
            icon={openForm ? faArrowLeft : faPlus}
            className={openForm ? styles.hide : styles.insert}
            onClick={() => setOpenForm(!openForm)}
          />
        }
      </div>
    </>
  );
}
