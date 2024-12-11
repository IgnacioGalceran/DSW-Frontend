import { Medicos } from "../medicos/type";

export type ObraSocial = {
  id: string;
  nombre: string;
  cuit: string;
  telefono: string;
  email: string;
  direccion: string;
  medicos: Medicos[];
};
