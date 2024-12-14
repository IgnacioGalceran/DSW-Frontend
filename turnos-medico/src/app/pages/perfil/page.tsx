"use client";
import { Pacientes } from "@/app/pages/pacientes/type";
import Confirma from "@/components/Confirmacion";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import useCRUD from "@/hooks/useCrud";
import useForm from "@/hooks/useForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../pages/pacientes/pacientes.module.css";
import { validateUpdateProfile } from "./validations";
import Select from "@/components/Select";
import { Usuarios } from "@/types/usuarios";

const DataProfile = () => {
  const { loading, fetchDataById } = useCRUD<Usuarios>(
    "auth/getUserData",
    false
  );
  const { update, loading: loadingUpdate } = useCRUD<Usuarios>(
    "auth/udtprofile",
    false
  );

  const {
    displayName,
    id: userId,
    uid,
    tipoDni,
    dni,
    login,
  } = useSelector((state: any) => state.auth);

  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const { classButtonEdit } = styles;

  const handleConfirma = (e: any) => {
    e.preventDefault();
    setOpenConfirma(true);
  };

  const submitDataUpdate = async (value: Pacientes) => {
    try {
      await update(uid, value);
    } catch (error: any) {
      console.error("Error al actualizar al usuario", error);
    }
  };

  const nombre = displayName?.split(" ")[0];
  const apellido = displayName?.split(" ")[1];

  const { values, setValues, errors, handleChange, handleBlur, handleSubmit } =
    useForm<Pacientes>(
      {
        usuario: {
          nombre: nombre,
          apellido: apellido,
          tipoDni: tipoDni,
          dni: dni,
        },
      },
      validateUpdateProfile,
      submitDataUpdate
    );

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetchDataById(uid);

      const { nombre, apellido, tipoDni, dni } = response.data;
      if (response) {
        setValues((prevValues: any) => ({
          ...prevValues,
          usuario: {
            nombre: nombre || "",
            apellido: apellido || "",
            tipoDni: tipoDni || "",
            dni: dni || "",
          },
        }));
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, setValues]);

  return (
    <>
      {(loading || loadingUpdate) && <Loader />}

      {openConfirma && (
        <Confirma
          message="Estás seguro de guardar los cambios?"
          open={openConfirma}
          setOpenConfirma={setOpenConfirma}
          handleConfirma={handleSubmit}
        />
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mt-4">
          Perfil de administrador
        </h2>
      </div>
      <form
        onSubmit={(e) => handleConfirma(e)}
        className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full sm:w-1/2 mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Input
            type="text"
            name="usuario.nombre"
            value={values.usuario?.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["usuario.nombre"]}
            placeholder="Nombre"
          />
          <Input
            type="text"
            name="usuario.apellido"
            value={values.usuario?.apellido}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["usuario.apellido"]}
            placeholder="Apellido"
          />
          <Select
            name="usuario.tipoDni"
            value={values.usuario?.tipoDni}
            onChange={handleChange}
            onBlur={handleBlur}
            options={[
              { id: "Dni", nombre: "Dni" },
              { id: "Pasaporte", nombre: "Pasaporte" },
            ]}
            error={errors["usuario.tipoDni"]}
            placeholder="Tipo documento"
          />

          <Input
            type="text"
            name="usuario.dni"
            value={values.usuario.dni}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["usuario.dni"]}
            placeholder="Numero de dni"
          />
        </div>
        <div>
          <button className={classButtonEdit} type="submit">
            Guardar cambios
          </button>
        </div>
      </form>
    </>
  );
};

export default DataProfile;
