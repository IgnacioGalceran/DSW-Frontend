import { Roles } from "../roles/type";

export type Pacientes = {
  usuario: {
    id?: string;
    uid?: string;
    nombre: string;
    apellido: string;
    dni: string;
    tipoDni: string;
    rol?: Roles;
    email: string;
  };
};
