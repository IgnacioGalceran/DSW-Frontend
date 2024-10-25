"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { ModalConfirma } from "@/types/confirma";
import confirma from "@/app/styles/confirma.module.css";

const Confirma: React.FC<ModalConfirma> = ({
  open,
  setOpenConfirma,
  handleConfirma,
  message,
  data = null,
}) => {
  return (
    <React.Fragment>
      {open && (
        <div
          className={confirma.container}
          onClick={() => setOpenConfirma(false)}
        >
          <div
            className={confirma.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={confirma.closeButton}
              onClick={() => setOpenConfirma(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className={confirma.respuestaContainer}>
              <div className={confirma.respuesta}>
                <div className={confirma.exclamation}>
                  <FontAwesomeIcon icon={faExclamation} />
                </div>
                <h2 className={confirma.mensaje}>{message}</h2>
              </div>
              <div className={confirma.buttonContainer}>
                <button
                  className={confirma.si}
                  onClick={(e) => {
                    handleConfirma(e);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className={confirma.no}
                  onClick={() => setOpenConfirma(false)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Confirma;
