import { Medicos } from "../../pages/medicos/type";
import { Pacientes } from "../../pages/pacientes/type";

export type Turnos = {
  id: string;
  fecha: Date;
  medico: Medicos;
  paciente: Pacientes;
  inicio: string;
  fin: string;
};
