import { Medicos } from "../medicos/type";
import { Pacientes } from "../pacientes/type";

export type Turnos = {
  id: string;
  fecha: string;
  medico: Medicos;
  paciente: Pacientes;
};
