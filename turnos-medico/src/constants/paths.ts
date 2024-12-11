import { HeaderList } from "@/types/headerList";
import { FRONT_URL } from "./const";
import {
  faCalendar,
  faList,
  faUser,
  faUserDoctor,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const headerList: HeaderList[] = [
  //Administrador
  // {
  //   path: `/pages/turnos`,
  //   title: "Turnos",
  //   icon: faCalendar,
  //   rol: ["Administrador"],
  // },
  {
    path: `/`,
    title: "Perfil",
    icon: faUser,
    rol: ["Administrador"],
    description: "Perfil",
  },
  {
    path: `/pages/medicos`,
    title: "Médicos",
    icon: faUserDoctor,
    rol: ["Administrador"],
    description: "Lista de médicos",
  },
  {
    path: `/pages/pacientes`,
    title: "Pacientes",
    icon: faUsers,
    rol: ["Administrador"],
    description: "Pacientes",
  },
  {
    path: `/pages/especialidades`,
    title: "Especialidades",
    icon: faList,
    rol: ["Administrador"],
    description: "Especialidades",
  },
  //Paciente
  {
    path: `/paciente/perfil`,
    title: "Perfil",
    icon: faUser,
    rol: ["Paciente"],
    description: "Perfil",
  },
  {
    path: `/paciente/turnos`,
    title: "Turnos",
    icon: faCalendar,
    rol: ["Paciente"],
    description: "Turnos",
  },
  //Medico
  {
    path: `/medico/turnos`,
    title: "Turnos",
    icon: faCalendar,
    rol: ["Medico"],
    description: "Turnos",
  },
  {
    path: `/medico/perfil`,
    title: "Perfil",
    icon: faUser,
    rol: ["Medico"],
    description: "Perfil",
  },
];
