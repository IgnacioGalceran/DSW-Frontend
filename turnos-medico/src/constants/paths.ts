import { HeaderList } from "@/types/headerList";
import { FRONT_URL } from "./const";

export const headerList: HeaderList[] = [
   //Perfil
  {
    path: `/`,
    title: "Perfil",
    rol: ["Administrador", "Medico", "Paciente"],
  },
  //Administrador
  {
    path: `/pages/turnos`,
    title: "Turnos",
    rol: ["Administrador"],
  },
  {
    path: `/pages/medicos`,
    title: "Médicos",
    rol: ["Administrador"],
  },
  {
    path: `/pages/pacientes`,
    title: "Pacientes",
    rol: ["Administrador"],
  },
  {
    path: `/pages/especialidades`,
    title: "Especialidades",
    rol: ["Administrador"],
  },
  //Paciente
  {
    path: `/paciente/turnos`,
    title: "Turnos",
    rol: ["Paciente"],
  },
  //Medico
  {
    path: `/medico/turnos`,
    title: "Turnos",
    rol: ["Medico"],
  },
];
