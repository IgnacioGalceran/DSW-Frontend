import { Roles } from "../roles/type";

export type Pacientes = {
  usuario: {
    id: string;
    uid: string;
    nombre: string;
    apellido: string;
    tipoDni: string;
    dni: string;
    rol: Roles;
  };
};
