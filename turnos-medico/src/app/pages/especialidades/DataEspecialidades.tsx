import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Especialidades } from "./type";
import styles from "./especialidades.module.css";
import { faEdit, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Confirma from "@/components/Confirmacion";
import { Filter } from "@/components/Filter";

export const DataEspecialidades = (props: {
  especialidades: response<Especialidades>;
  setDataUpdate: (e: Especialidades) => void;
  remove: any;
  setOpenForm: any;
}) => {
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Especialidades[]>([]);

  const confirmaDelete = async (id: string) => {
    setOpenConfirma(true);
    setId(id);
    setMessage("¿Está seguro que quiere borrar la especialidad?");
  };

  const handleDelete = async () => {
    try {
      if (id) await props.remove(id);
    } catch (error) {
    } finally {
      setOpenConfirma(false);
    }
  };

  const especialidadesArray = Array.isArray(props.especialidades.data)
    ? props.especialidades.data
    : [];

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
      <Filter data={especialidadesArray} onFilteredData={setFilteredData} />

      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-2 px-6 my-3"
      >
        {filteredData.map((especialidad) => (
          <li
            className={`md:w-1/5 rounded-md m-2 ${styles.especialidadCard}`}
            key={especialidad.id}
          >
            <div className="min-w-0 gap-x-4">
              <div className="min-w-0">
                <p className="capitalize text-sm font-semibold leading-6 text-gray-900">
                  {especialidad.nombre}
                </p>
              </div>
            </div>
            <div className={styles.acciones}>
              <FontAwesomeIcon
                icon={faEdit}
                className={styles.edit}
                onClick={() => {
                  props.setDataUpdate(especialidad);
                  props.setOpenForm(true);
                }}
              />
              <FontAwesomeIcon
                id={`${especialidad.nombre}`}
                icon={faTrash}
                className={styles.trash}
                onClick={() =>
                  especialidad?.id && confirmaDelete(especialidad.id)
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
