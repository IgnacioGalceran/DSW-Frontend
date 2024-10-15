import { HeaderList } from "@/types/headerList";
import { FRONT_URL } from "./const";

export const headerList: HeaderList[] = [
  {
    path: `/`,
    title: "Principal",
    rol: ["Administrador", "Medico", "Paciente"],
  },
  {
    path: `/pages/turnos`,
    title: "Turnos",
    rol: ["Administrador", "Medico", "Paciente"],
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
];
