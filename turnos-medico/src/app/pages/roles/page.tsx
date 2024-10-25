"use client";
import { Roles } from "./type";
import Loader from "../../../components/Loader";
import styles from "./roles.module.css";
import React, { useEffect } from "react";
import useCRUD from "@/hooks/useCrud";

export default function ListaRoles() {
  const { fetchData, data: roles, loading } = useCRUD<Roles>("roles");

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="overflow-auto">
        <div>
          <h1 className="font-sans text-3xl text-center p-10">
            Lista de Roles
          </h1>
        </div>
        {loading && <Loader />}
        <div>
          <ul role="list" className="flex justify-center flex-row flex-wrap">
            {roles.data?.map((rol: Roles) => (
              <li
                className={`w-4/5 md:w-1/4 py-5 rounded-md m-2 p-4 ${styles.sombra}`}
                key={rol.id}
              >
                <div className="min-w-0 gap-x-4">
                  <div className="min-w-0">
                    <p className="capitalize text-sm font-semibold leading-6 text-gray-900">
                      {rol.nombre}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
