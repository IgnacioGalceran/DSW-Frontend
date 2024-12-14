import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObraSocial } from "./type";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Confirma from "@/components/Confirmacion";
import styles from "./obrasocial.module.css";

export const DataObrasocial = (props: {
  obrasSociales: response<ObraSocial>;
  setDataUpdate: (e: ObraSocial) => void;
  remove: any;
  setOpenForm: any;
}) => {
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const confirmaDelete = async (id: string) => {
    setOpenConfirma(true);
    setId(id);
    setMessage("¿Está seguro que quiere borrar la obra social?");
  };

  const handleDelete = async () => {
    try {
      if (id) await props.remove(id);
    } catch (error) {
    } finally {
      setOpenConfirma(false);
    }
  };

  return (
    <div>
      {openConfirma && (
        <Confirma
          open={openConfirma}
          setOpenConfirma={setOpenConfirma}
          message={message}
          handleConfirma={handleDelete}
        />
      )}
      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 px-6 my-3"
      >
        {Array.isArray(props.obrasSociales.data) &&
          props.obrasSociales.data?.map((obrasocial: ObraSocial) => (
            <li
              className={`rounded-md m-2 ${styles.especialidadCard}`}
              key={obrasocial.id}
            >
              <div className="min-w-0 gap-x-4">
                <div className="min-w-0">
                  <p className="capitalize text-sm font-semibold leading-6 text-gray-900">
                    {obrasocial.nombre}
                  </p>
                </div>
              </div>
              <div className={styles.acciones}>
                <FontAwesomeIcon
                  icon={faEdit}
                  className={styles.edit}
                  onClick={() => {
                    props.setDataUpdate(obrasocial);
                    props.setOpenForm(true);
                  }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className={styles.trash}
                  onClick={() =>
                    obrasocial?.id && confirmaDelete(obrasocial.id)
                  }
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
