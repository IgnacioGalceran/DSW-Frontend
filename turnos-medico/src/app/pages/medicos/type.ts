import { Usuarios } from "@/types/usuarios";
import { Especialidades } from "../especialidades/type";

export type Medicos = {
  usuario: Usuarios;
  id?: string;
  especialidad?: any;
  horaDesde?: string;
  horaHasta?: string;
  matricula: string;
  diasAtencion?: string[];
};
