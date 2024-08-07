import { Medicos } from "../medicos/type";

export type Especialidades = {
  id: string;
  nombre: string;
  medicos: Medicos[];
};
