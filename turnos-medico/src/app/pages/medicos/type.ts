import { Usuarios } from "@/types/usuarios";
import { ObraSocial } from "../obrasocial/type";

export type Medicos = {
  usuario: Usuarios;
  id?: string;
  especialidad?: any;
  horaDesde?: string;
  horaHasta?: string;
  matricula: string;
  diasAtencion?: string[];
  obrasocial: ObraSocial[];
  indisponibilidades?: Date[];
};
