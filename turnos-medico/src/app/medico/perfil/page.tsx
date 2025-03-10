"use client";
import React, { useEffect, useState } from "react";
import Confirma from "@/components/Confirmacion";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import useCRUD from "@/hooks/useCrud";
import useForm from "@/hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../pages/pacientes/pacientes.module.css";
import { validateMedicos } from "./validations";
import Select from "@/components/Select";
import { Medicos } from "@/app/pages/medicos/type";
import { dias, horas } from "@/constants/const";
import { Especialidades } from "@/app/pages/especialidades/type";
import { ObraSocial } from "@/app/pages/obrasocial/type";

const DataProfile = () => {
  const { data: medico, loading, fetchDataById } = useCRUD<any>("medicos");
  const { loading: loadingUpdate, update } =
    useCRUD<Medicos>("medicos/udtProfile");
  const {
    data: especialidades,
    loading: loadingEspecialidades,
    fetchData: fetchEspecialidades,
  } = useCRUD<Especialidades>("especialidades");
  const {
    data: obrasocial,
    loading: loadingObrasocial,
    fetchData: fetchObrasocial,
  } = useCRUD<ObraSocial>("obrasocial");
  const { id: userId, uid: uid } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (typeof userId === "string") {
      fetchDataById(userId);
      fetchEspecialidades();
      fetchObrasocial();
    }
  }, [userId]);

  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const { classButtonEdit } = styles;

  const handleConfirma = (e: any) => {
    e.preventDefault();
    setOpenConfirma(true);
  };

  const submitDataUpdate = async (value: Medicos) => {
    try {
      let dias = diasAtencion
        .filter((diaObj) => diaObj.isSelected)
        .map((diaObj) => diaObj.dia);
      value.diasAtencion = dias;

      let obrasSocialesValue = obrasSocialesSeleccionadas
        .filter((osObj) => osObj.isSelected)
        .map((osObj) => osObj.id)
        .filter((id): id is string => id !== undefined) as any;

      value.obrasocial = obrasSocialesValue;
      await update(uid, value);
    } catch (error: any) {
      showToast(error.message, "FAIL", 3000);
    } finally {
      setOpenConfirma(false);
    }
  };

  const [initialValues, setInitialValues] = useState<Medicos | null>(null);
  const [diasAtencion, setDiasAtencion] = useState([
    { dia: "Lunes", isSelected: false },
    { dia: "Martes", isSelected: false },
    { dia: "Miércoles", isSelected: false },
    { dia: "Jueves", isSelected: false },
    { dia: "Viernes", isSelected: false },
    { dia: "Sábado", isSelected: false },
    { dia: "Domingo", isSelected: false },
  ]);
  const [obrasSocialesSeleccionadas, setObrasSocialesSeleccionadas] = useState(
    Array.isArray(obrasocial.data) && obrasocial.data.length
      ? obrasocial.data.map((os) => ({
          id: os.id,
          nombre: os.nombre,
          isSelected: initialValues?.obrasocial?.some(
            (osValue: any) => osValue === os.id
          ),
        }))
      : []
  );

  useEffect(() => {
    if (initialValues) {
      setDiasAtencion(
        dias.map((dia) => {
          return {
            dia: dia,
            isSelected: initialValues.diasAtencion?.some((diaValue: any) => {
              return diaValue === dia;
            })
              ? true
              : false,
          };
        })
      );
    }
  }, [initialValues]);

  useEffect(() => {
    if (initialValues?.obrasocial) {
      const data = Array.isArray(obrasocial.data)
        ? obrasocial.data
        : [obrasocial.data];

      setObrasSocialesSeleccionadas((prevState) => {
        return data.map((os: any) => {
          return {
            ...os,
            isSelected: initialValues.obrasocial.some(
              (osValue: any) => osValue === os.id
            ),
          };
        });
      });
    }
  }, [initialValues, obrasocial.data]);

  useEffect(() => {
    if (medico.data.id) {
      setInitialValues({
        usuario: {
          nombre: medico.data?.usuario?.nombre || "",
          apellido: medico.data?.usuario?.apellido || "",
          tipoDni: medico.data?.usuario?.tipoDni || "",
          dni: medico.data?.usuario?.dni || "",
        },
        especialidad: medico.data?.especialidad || "",
        horaDesde: medico.data?.horaDesde || "",
        horaHasta: medico.data?.horaHasta || "",
        matricula: medico.data?.matricula || "",
        diasAtencion: medico.data?.diasAtencion || [],
        obrasocial: medico.data?.obrasocial || [],
      });
      setValues({
        usuario: {
          nombre: medico.data?.usuario?.nombre || "",
          apellido: medico.data?.usuario?.apellido || "",
          tipoDni: medico.data?.usuario?.tipoDni || "",
          dni: medico.data?.usuario?.dni || "",
        },
        especialidad: medico.data?.especialidad || "",
        horaDesde: medico.data?.horaDesde || "",
        horaHasta: medico.data?.horaHasta || "",
        matricula: medico.data?.matricula || "",
        diasAtencion: medico.data?.diasAtencion || [],
        obrasocial: medico.data?.obrasocial || [],
      });
    }
  }, [medico.data]);

  const { values, setValues, errors, handleChange, handleBlur, handleSubmit } =
    useForm<Medicos>(
      initialValues || ({} as Medicos),
      validateMedicos,
      submitDataUpdate
    );

  const handleDaySelect = (obj: { dia: string; isSelected: boolean }) => {
    let diasAtencionObj = [...diasAtencion];

    let diaIndex = diasAtencion.findIndex((diaObj) => obj.dia === diaObj.dia);

    if (diaIndex !== -1) {
      diasAtencionObj[diaIndex] = {
        ...diasAtencionObj[diaIndex],
        isSelected: !obj.isSelected,
      };
    }

    setDiasAtencion(diasAtencionObj);
  };

  const handleOSSelect = (obj: {
    id: string;
    nombre: string;
    isSelected: boolean;
  }) => {
    let osObj = [...obrasSocialesSeleccionadas];

    let osIndex = obrasSocialesSeleccionadas.findIndex(
      (osObj: any) => obj.id === osObj.id
    );

    if (osIndex !== -1) {
      osObj[osIndex] = {
        ...osObj[osIndex],
        isSelected: !obj.isSelected,
      };
    }

    setObrasSocialesSeleccionadas(osObj);
  };

  const getHoraEnEntero = (hora: string) => parseInt(hora.split(":")[0], 10);

  const horasFiltradasHasta = horas.filter((hora) => {
    if (!values.horaDesde) return true;
    const horaDesdeEntero = getHoraEnEntero(values.horaDesde);
    const horaActualEntero = getHoraEnEntero(hora.id);
    const horaLimite = Math.min(horaDesdeEntero + 8, 23);
    return horaActualEntero > horaDesdeEntero && horaActualEntero <= horaLimite;
  });

  if (loading || loadingEspecialidades) return <Loader />;

  return (
    <>
      {openConfirma && (
        <Confirma
          message="Estás seguro de guardar los cambios?"
          open={openConfirma}
          setOpenConfirma={setOpenConfirma}
          handleConfirma={handleSubmit}
        />
      )}
      <div className="sm:mx-auto sm:w-full lg:w-3/4 xl:w-2/3 mt-10">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mt-4">
          Perfil de médico
        </h2>
      </div>
      <form
        onSubmit={(e) => handleConfirma(e)}
        className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full mx-auto"
        key={JSON.stringify(initialValues)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            value={values.usuario?.dni}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["usuario.dni"]}
            placeholder="Numero"
          />
          <Select
            name="especialidad"
            value={values.especialidad?.id}
            onChange={handleChange}
            onBlur={handleBlur}
            options={especialidades.data as { id: string; nombre: string }[]}
            error={errors["especialidad"]}
            placeholder="Especialidad"
          />
          <Input
            type="text"
            name="matricula"
            value={values.matricula}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["matricula"]}
            placeholder="Matrícula*"
          />
          <Select
            name="horaDesde"
            value={values.horaDesde}
            onChange={handleChange}
            onBlur={handleBlur}
            options={horas}
            error={errors.horaDesde}
            placeholder="Hora desde"
          />
          <Select
            name="horaHasta"
            value={values.horaHasta}
            onChange={handleChange}
            onBlur={handleBlur}
            options={horasFiltradasHasta}
            error={errors.horaHasta}
            placeholder="Hora hasta"
          />
          <div>
            <h2 className="block text-gray-700 text-sm font-bold">
              Días de atención
            </h2>
            <div className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer max-h-[140px] overflow-auto">
              {diasAtencion.map((obj) => (
                <p
                  key={obj.dia}
                  className={
                    obj.isSelected
                      ? "text-blue-700 bg-blue-100 p-1 m-0"
                      : "text-black bg-white p-1 m-0"
                  }
                  onClick={() => handleDaySelect(obj)}
                >
                  {obj.dia}
                </p>
              ))}
            </div>
            <p
              className={`text-red-500 text-xs italic ${
                errors["diasAtencion"] ? "visible" : "invisible"
              }`}
              style={{ minHeight: "1.25rem" }}
            >
              {errors["diasAtencion"] || " "}
            </p>
          </div>
          <div>
            <h2 className="block text-gray-700 text-sm font-bold">
              Obras sociales
            </h2>
            <div className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer max-h-[140px] overflow-auto">
              {obrasSocialesSeleccionadas.map((obj: any) => (
                <p
                  key={obj.nombre}
                  className={
                    obj.isSelected
                      ? "text-blue-700 bg-blue-100 p-1 m-0"
                      : "text-black bg-white p-1 m-0"
                  }
                  onClick={() => handleOSSelect(obj)}
                >
                  {obj.nombre}
                </p>
              ))}
            </div>
            <p
              className={`text-red-500 text-xs italic ${
                errors["obrasocial"] ? "visible" : "invisible"
              }`}
              style={{ minHeight: "1.25rem" }}
            >
              {errors["obrasocial"] || " "}
            </p>
          </div>
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
function showToast(message: any, arg1: string, arg2: number) {
  throw new Error("Function not implemented.");
}
