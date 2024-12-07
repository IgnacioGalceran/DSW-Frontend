import { Usuarios } from "@/types/usuarios";

export type Medicos = {
  usuario: Usuarios;
  id?: string;
  especialidad?: any;
  horaDesde?: string;
  horaHasta?: string;
  matricula: string;
  diasAtencion?: string[];
  obrasocial: string[];
};
