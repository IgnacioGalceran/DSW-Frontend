"use client";
import React, { useEffect, useState } from "react";
import { Turnos } from "./type";
import Loader from "../../../components/Loader";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import InsertTurnos from "./CreateTurnos";
import useCRUD from "@/hooks/useCrud";
import { Especialidades } from "../especialidades/type";
import styles from "./turnos.module.css";

export default function ListaTurnos() {
  const {
    fetchData,
    data: especialidades,
    loading: loadingEspecialidades,
  } = useCRUD<Especialidades>("especialidades");
  const [openForm, setOpenForm] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {loadingEspecialidades && <Loader />}
      <div className={styles.turnosContainer}>
        {!openForm && (
          <React.Fragment>
            <div>
              <h1 className="font-sans text-3xl text-center p-10">Turnos</h1>
            </div>
            <div className={styles.imagenContainer}>
              <Image
                src={"/assets/turnos.png"}
                width={500}
                height={500}
                alt=""
                className={styles.imagen}
              />
            </div>
          </React.Fragment>
        )}

        <FontAwesomeIcon
          icon={openForm ? faArrowLeft : faPlus}
          className={openForm ? styles.hide : styles.insert}
          onClick={() => setOpenForm(!openForm)}
        />
      </div>
      {openForm && <InsertTurnos especialidades={especialidades} />}
    </React.Fragment>
  );
}
