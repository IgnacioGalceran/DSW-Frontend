"use client";
import useFind from "../hooks/useFind";

export default function ListaMedicos() {
  const { data: medicos } = useFind<medicos>("medicos");
  if (!medicos) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="h-screen bg-gradient-to-b from-emerald-300 from-10% via-emerald-200 via-30% to-emerald-100 to-75% ">
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div>
      <h1 className="font-sans text-3xl "> Lista de Médicos</h1>
      <ul className="list-decimal">
        {medicos.data?.map((medico: medicos) => (
          <li className="font-sans" key={medico.id}>
            {medico.nombre} - {medico.idEspecialidad}
          </li>
        ))}
      </ul>
    </div>
  );
}
