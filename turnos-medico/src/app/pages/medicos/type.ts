import { Especialidades } from "../especialidades/type";
import { Roles } from "../roles/type";

export type Medicos = {
  usuario: {
    id?: string;
    uid?: string;
    nombre: string;
    apellido: string;
    dni: string;
    tipoDni: string;
    rol?: Roles;
    email?: string;
  };
  id?: string;
  especialidad?: any;
  horaDesde?: string;
  horaHasta?: string;
  matricula: string;
  diasAtencion?: string[];
};
