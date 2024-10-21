export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL;
export const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
export const horas = Array.from({ length: 24 }, (_, i) => ({
  id: `${i.toString().padStart(2, "0")}:00`,
  nombre: `${i.toString().padStart(2, "0")}:00`,
}));
