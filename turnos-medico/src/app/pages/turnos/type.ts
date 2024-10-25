import { Medicos } from "../medicos/type";
import { Pacientes } from "../pacientes/type";

export type Turnos = {
  id: string;
  fecha: Date;
  medico: Medicos;
  paciente: Pacientes;
  rango: string;
};
