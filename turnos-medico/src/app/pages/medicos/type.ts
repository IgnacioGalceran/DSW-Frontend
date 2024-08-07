import { Especialidades } from "../especialidades/type";

export type Medicos = {
  id: string;
  uid: string;
  rol: string;
  nombre: string;
  apellido: string;
  telefono: string;
  tipoDni: string;
  especialidad: Especialidades | null;
  horaDesde: string;
  horaHasta: string;
  matricula: string;
  diasAtencion: string;
};
