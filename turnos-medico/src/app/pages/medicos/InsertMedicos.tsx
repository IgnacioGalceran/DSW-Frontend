import { useState } from "react";
import { Medicos } from "./type";
import useForm from "@/hooks/useForm";
import Confirma from "@/components/Confirmacion";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { Especialidades } from "../especialidades/type";
import React from "react";
import { dias, horas } from "@/constants/const";
import { validateInsert } from "./validations/validateInsert";
import { validateUpdate } from "./validations/validateUpdate";
import { ObraSocial } from "../obrasocial/type";

type FormValues = Medicos & {
  email?: string;
  password?: string;
  repeatPassword?: string;
};

export default function InsertMedicos(props: {
  initialValues: any;
  isUpdating: boolean;
  setOpenForm: any;
  especialidades: Especialidades[];
  obrasSociales: ObraSocial[];
  insert: any;
  update: any;
}) {
  const [openConfirma, setOpenConfirma] = useState<boolean>(false);
  const [diasAtencion, setDiasAtencion] = useState(
    props.initialValues
      ? dias.map((dia) => {
          return {
            dia: dia,
            isSelected: props.initialValues.diasAtencion?.some(
              (diaValue: any) => diaValue === dia
            )
              ? true
              : false,
          };
        })
      : [
          { dia: "Lunes", isSelected: false },
          { dia: "Martes", isSelected: false },
          { dia: "Miércoles", isSelected: false },
          { dia: "Jueves", isSelected: false },
          { dia: "Viernes", isSelected: false },
          { dia: "Sábado", isSelected: false },
          { dia: "Domingo", isSelected: false },
        ]
  );
  const [obrasSocialesSeleccionadas, setObrasSocialesSeleccionadas] = useState(
    props.initialValues?.obrasocial.length
      ? props.obrasSociales.map((os) => ({
          id: os.id,
          nombre: os.nombre,
          isSelected: props.initialValues.obrasocial?.some(
            (osValue: string) => {
              return osValue === os.id;
            }
          ),
        }))
      : props.obrasSociales.map((os) => ({
          id: os.id,
          nombre: os.nombre,
          isSelected: false,
        }))
  );

  const submitMedicos = async (
    value: Medicos & {
      email: string;
      password: string;
      repeatPassword: string;
    }
  ) => {
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

      if (props.isUpdating) {
        await props.update(props.initialValues?.id, value);
      } else {
        await props.insert(value);
      }
      props.setOpenForm(false);
    } catch (error) {
      console.error("Error al enviar el médico:", error);
    }
  };

  const getInitialFormValues = (
    initialValues: FormValues,
    isUpdating: boolean
  ): FormValues => {
    if (isUpdating) {
      return {
        matricula: initialValues.matricula || "",
        especialidad: initialValues.especialidad?.id?.toString() || "",
        diasAtencion: initialValues.diasAtencion || [],
        horaDesde: initialValues.horaDesde || "",
        horaHasta: initialValues.horaHasta || "",
        obrasocial: initialValues.obrasocial || [],
        usuario: {
          uid: initialValues.usuario?.uid || "",
          nombre: initialValues.usuario?.nombre || "",
          apellido: initialValues.usuario?.apellido || "",
          tipoDni: initialValues.usuario?.tipoDni || "",
          dni: initialValues.usuario?.dni || "",
        },
      };
    }

    return {
      email: "",
      password: "",
      repeatPassword: "",
      matricula: "",
      diasAtencion: [],
      horaDesde: "",
      horaHasta: "",
      obrasocial: [],
      usuario: {
        uid: "",
        nombre: "",
        apellido: "",
        tipoDni: "",
        dni: "",
      },
    };
  };

  const initialFormValues = getInitialFormValues(
    props.initialValues,
    props.isUpdating
  );

  const classButton =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mt-2 px-2 text-lg rounded focus:outline-none focus:shadow-outline mx-auto block";

  const handleConfirma = (e: any) => {
    e.preventDefault();
    setOpenConfirma(true);
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } =
    useForm<FormValues>(
      { ...initialFormValues },
      props.isUpdating ? validateUpdate : validateInsert,
      submitMedicos
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
      (osObj) => obj.id === osObj.id
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

  return (
    <React.Fragment>
      {openConfirma && (
        <Confirma
          message={
            props.isUpdating
              ? "Está seguro que quiere actualizar el médico?"
              : "Está seguro que quiere agregar el médico"
          }
          open={openConfirma}
          setOpenConfirma={setOpenConfirma}
          handleConfirma={handleSubmit}
        />
      )}
      <form
        onSubmit={(e) => handleConfirma(e)}
        className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full sm:w-1/2 lg:w-3/4 xl:w-2/3 mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {!props.isUpdating && (
            <React.Fragment>
              <Input
                type="email"
                name="email"
                value={values.email || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors["email"]}
                placeholder="Correo electrónico*"
              />
              <Input
                type="text"
                name="password"
                value={values.password || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors["password"]}
                placeholder="Contraseña*"
              />
              <Input
                type="text"
                name="repeatPassword"
                value={values.repeatPassword || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors["repeatPassword"]}
                placeholder="Repetir contraseña*"
              />
            </React.Fragment>
          )}

          <Input
            type="text"
            name="usuario.nombre" // El name está anidado
            value={values.usuario?.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["usuario.nombre"]}
            placeholder="Nombre del Médico*"
          />
          <Input
            type="text"
            name="usuario.apellido"
            value={values.usuario?.apellido}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["usuario.apellido"]}
            placeholder="Apellido del Médico*"
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
            placeholder="Tipo DNI"
          />
          <Input
            type="text"
            name="usuario.dni"
            value={values.usuario?.dni}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors["usuario.dni"]}
            placeholder="Dni del Médico*"
          />
          <Select
            name="especialidad"
            value={values.especialidad}
            onChange={handleChange}
            onBlur={handleBlur}
            options={props.especialidades as any}
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
        <button className={classButton} type="submit">
          {props.isUpdating ? "Actualizar médico" : "Cargar médico"}
        </button>
      </form>
    </React.Fragment>
  );
}
