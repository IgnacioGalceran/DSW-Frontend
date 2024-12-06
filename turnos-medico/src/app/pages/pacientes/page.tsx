"use client";
import { Pacientes } from "./type";
import Loader from "../../../components/Loader";
import styles from "./pacientes.module.css";
import React, { useEffect, useState } from "react";
import useCRUD from "@/hooks/useCrud";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import Confirma from "@/components/Confirmacion";

export default function ListaPacientes() {
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const { update, loading: loadingVerificar } = useCRUD<Pacientes>(
    "pacientes/verificar"
  );
  const [mensaje, setMensaje] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [paciente, setPaciente] = useState<any>(null);
  const {
    fetchData,
    data: pacientes,
    loading,
  } = useCRUD<Pacientes>("pacientes");

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerifica = async () => {
    try {
      const updated = await update(id, paciente);

      if (!updated.error) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setId("");
      setPaciente(null);
      setMensaje("");
      setOpenConfirma(false);
    }
  };

  console.log(pacientes);

  return (
    <React.Fragment>
      {(loading || loadingVerificar) && <Loader />}
      <Confirma
        open={openConfirma}
        setOpenConfirma={setOpenConfirma}
        message={mensaje}
        handleConfirma={handleVerifica}
      />
      <div className="overflow-auto">
        <div>
          <h1 className="font-sans text-3xl text-center p-10">
            Lista de Pacientes
          </h1>
        </div>
        {loading && <Loader />}
        <div>
          <ul role="list" className="flex justify-center flex-row flex-wrap">
            {Array.isArray(pacientes.data) &&
              pacientes.data?.map((paciente: Pacientes) => {
                if (!paciente.usuario.id) return;
                const baseClass = `w-4/5 md:w-1/4 py-5 rounded-md m-2 p-4 ${styles.sombra}`;
                const verifiedClass = paciente.usuario.verificado
                  ? ""
                  : ` ${styles.unverified}`;
                const className = baseClass + verifiedClass;
                return (
                  <li className={className} key={paciente.usuario.id}>
                    <div className="min-w-0 gap-x-4">
                      <div className="min-w-0">
                        <p className="capitalize text-sm font-semibold leading-6 text-gray-900">
                          {`${paciente.usuario.nombre} ${paciente.usuario.apellido}`}
                        </p>
                        <p className="capitalize text-sm font-semibold leading-6 text-gray-900">
                          {`${paciente.usuario.email}`}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {"Dni: " + paciente.usuario.dni}
                        </p>
                        <p
                          className={`mt 1 ${styles.verifier}`}
                          onClick={() => {
                            setOpenConfirma(true);
                            setPaciente(paciente);
                            setMensaje(
                              paciente.usuario.verificado
                                ? `Está seguro que quiere deshabilitar el paciente?`
                                : `Está seguro que quiere habilitar el paciente?`
                            );
                            if (paciente.usuario.id) setId(paciente.usuario.id);
                          }}
                        >
                          {paciente.usuario.verificado ? (
                            <FontAwesomeIcon
                              icon={faUserMinus}
                              className={styles.minus}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faUserCheck}
                              className={styles.check}
                            />
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
