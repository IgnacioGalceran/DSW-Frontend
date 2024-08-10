import { Especialidades } from "../especialidades/type";
import { Roles } from "../roles/type";

export type Medicos = {
  usuario: {
    id: string;
    uid: string;
    nombre: string;
    apellido: string;
    tipoDni: string;
  };
  telefono: string;
  especialidad: Especialidades | null;
  horaDesde: string;
  horaHasta: string;
  matricula: string;
  diasAtencion: string;
  rol: Roles;
};
