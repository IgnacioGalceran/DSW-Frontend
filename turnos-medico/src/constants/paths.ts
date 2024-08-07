import { HeaderList } from "@/types/headerList";
import { FRONT_URL } from "./const";

console.log(FRONT_URL);

export const headerList: HeaderList[] = [
  {
    path: `http://localhost:3000/`,
    title: "Principal",
  },
  {
    path: `http://localhost:3000/pages/medicos`,
    title: "Médicos",
  },
  {
    path: `http://localhost:3000/pages/pacientes`,
    title: "Pacientes",
  },
  {
    path: `http://localhost:3000/pages/especialidades`,
    title: "Especialidades",
  },
  {
    path: `http://localhost:3000/pages/roles`,
    title: "Roles",
  },
];
