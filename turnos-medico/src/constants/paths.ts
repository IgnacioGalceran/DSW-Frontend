import { HeaderList } from "@/types/headerList";
import { FRONT_URL } from "./const";
import {
  faCalendar,
  faInstitution,
  faList,
  faUser,
  faUserDoctor,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const headerList: HeaderList[] = [
  //Perfil
  // {
  //   path: `/`,
  //   title: "Perfil",
  //   icon: faUser,
  //   rol: ["Administrador", "Medico", "Paciente"],
  // },
  {
    path: `/paciente/perfil`,
    title: "Perfil",
    icon: faUser,
    rol: ["Paciente"],
  },
  {
    path: `/medico/perfil`,
    title: "Perfil",
    icon: faUser,
    rol: ["Medico"],
  },
  {
    path: `/pages/perfil`,
    title: "Perfil",
    icon: faUser,
    rol: ["Administrador"],
  },
  //Administrador
  // {
  //   path: `/pages/turnos`,
  //   title: "Turnos",
  //   icon: faCalendar,
  //   rol: ["Administrador"],
  // },
  {
    path: `/pages/medicos`,
    title: "Médicos",
    icon: faUserDoctor,
    rol: ["Administrador"],
  },
  {
    path: `/pages/obrasocial`,
    title: "Obras Sociales",
    icon: faInstitution,
    rol: ["Administrador"],
  },
  {
    path: `/pages/pacientes`,
    title: "Pacientes",
    icon: faUsers,
    rol: ["Administrador"],
  },
  {
    path: `/pages/especialidades`,
    title: "Especialidades",
    icon: faList,
    rol: ["Administrador"],
  },
  //Paciente
  {
    path: `/paciente/turnos`,
    title: "Turnos",
    icon: faCalendar,
    rol: ["Paciente"],
  },
  //Medico
  {
    path: `/medico/turnos`,
    title: "Turnos",
    icon: faCalendar,
    rol: ["Medico"],
  },
];
