"use client";
import useFind from "../hooks/useFind";

export default function ListaMedicos() {
  const { data: medicos } = useFind<medicos>("medicos");
  if (!medicos) {
    return <div>Cargando...</div>;
  }
  console.log(medicos);
  return (
    <>
      <div className="h-screen  bg-gradient-to-b from-emerald-300 from-10% via-emerald-200 via-30% to-emerald-100 to-75%">
        <div>
          <h1 className="font-sans text-3xl "> Lista de Médicos</h1>
        </div>
        <div className="flex">
          <ul role="list" className="divide-y divide-gray-100 ">
            {medicos.data?.map((medico: medicos) => (
              <li className="flex justify-between gap-x-6 py-5" key={medico.id}>
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {medico.nombre + " " + medico.apellido}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {"Matricula: " + medico.matricula}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {"telefono: " + medico.telefono}
                    </p>
                  </div>
                </div>
                <div className=" sm:flex sm:flex-col ">
                  <p className="text-sm leading-6 text-gray-900"></p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Last seen
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
