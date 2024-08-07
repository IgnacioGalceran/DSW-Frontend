import { HeaderList } from "@/types/headerList";
import { FRONT_URL } from "./const";

export const headerList: HeaderList[] = [
  {
    path: `/`,
    title: "Principal",
  },
  {
    path: `/pages/medicos`,
    title: "Médicos",
  },
  {
    path: `/pages/pacientes`,
    title: "Pacientes",
  },
  {
    path: `/pages/especialidades`,
    title: "Especialidades",
  },
  {
    path: `/pages/roles`,
    title: "Roles",
  },
];
