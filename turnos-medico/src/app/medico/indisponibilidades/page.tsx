"use client";
import React, { useEffect, useState } from "react";
import Confirma from "@/components/Confirmacion";
import Loader from "@/components/Loader";
import { Medicos } from "@/app/pages/medicos/type";
import useCRUD from "@/hooks/useCrud";
import Input from "@/components/Input";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Indisponibilidades = () => {
  const { id: userId, uid: uid } = useSelector((state: any) => state.auth);
  const { data: medico, loading, fetchDataById } = useCRUD<any>("medicos");
  const {
    loading: loadingUpdate,
    update,
    remove,
  } = useCRUD<Medicos>("medicos/indisponibilidad", false);
  const [indisponibilidad, setIndisponibilidad] = useState<string>("");
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (typeof userId === "string") {
      fetchDataById(userId);
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIndisponibilidad(value);
  };

  const handleRemove = async () => {
    if (!medico || !medico.data) return;

    if (indisponibilidad)
      await remove(uid, [{ key: "indisponibilidad", value: indisponibilidad }]);

    fetchDataById(userId);
    setMessage("");
  };

  const handleAction = (e: any, isUpdate: boolean) => {
    e.preventDefault();

    if (isUpdate) {
      setIsUpdate(true);
      setMessage(
        "Está seguro que quiere ingresar el día como indisponibilidad?"
      );
    } else {
      setIsUpdate(false);
      setMessage("Está seguro que quiere borrar el día?");
    }

    setOpenConfirma(true);
  };

  const handleUpdate = async () => {
    if (!indisponibilidad) return;
    await update(uid, { indisponibilidad });
    setIndisponibilidad("");
    fetchDataById(userId);
  };

  const handleConfirma = async () => {
    if (isUpdate) {
      await handleUpdate();
    } else {
      await handleRemove();
    }

    setMessage("");
    setOpenConfirma(false);
    setIndisponibilidad("");
  };

  return (
    <React.Fragment>
      {(loading || loadingUpdate) && <Loader />}
      {openConfirma && (
        <Confirma
          open={openConfirma}
          setOpenConfirma={setOpenConfirma}
          handleConfirma={handleConfirma}
          message={message}
        />
      )}
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
        <h1 className="text-xl font-bold mb-4 text-center">
          Cargar Indisponibilidades
        </h1>
        <form className="mb-6" onSubmit={(e) => handleAction(e, true)}>
          <input
            type="date"
            name="indisponibilidad"
            value={indisponibilidad}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            min={
              new Date(new Date().setDate(new Date().getDate() + 1))
                .toISOString()
                .split("T")[0]
            }
          />
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded transition ${
              indisponibilidad === ""
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={indisponibilidad === ""}
          >
            Agregar Fecha
          </button>
        </form>

        <h2 className="text-lg font-semibold mb-2">
          Fechas de Indisponibilidad
        </h2>
        {medico?.data?.indisponibilidades?.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Fecha</th>
                <th className="border px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medico.data.indisponibilidades
                .sort(
                  (a: string, b: string) =>
                    new Date(a).getTime() - new Date(b).getTime()
                )
                .map((fecha: string, index: number) => (
                  <tr key={index} className="hover:bg-gray-100 transition">
                    <td className="border px-4 py-2">
                      {new Date(fecha).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          setIndisponibilidad(
                            new Date(fecha).toISOString().slice(0, 10)
                          );
                          handleAction(new Event("click"), false);
                        }}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">
            No hay fechas de indisponibilidad registradas.
          </p>
        )}
      </div>
    </React.Fragment>
  );
};

export default Indisponibilidades;
