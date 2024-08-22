"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "@/firebase/config";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants/const";
import styles from "./register.module.css";
import { validate } from "./validationsFields";

const page = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    password: "",
  });

  const changeUser = (event: any) => {
    useState;
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const registerUser = async (e: any) => {
    e.preventDefault();
    await validate(credentials);
    const displayName = `${credentials.name} ${credentials.lastname}`;
    console.log(displayName);
    try {
      const userData = await createUserWithEmailAndPassword(
        FirebaseAuth,
        credentials.email,
        credentials.password
      );

      const { uid } = userData.user;

      const bodyData = {
        uid,
        displayName,
        tipoDni: "DNI",
        dni: credentials.dni,
      };

      const response = await fetch(`${API_URL}/auth/registerPaciente`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
    } catch (error) {}
  };

  return (
    <div
      className={`${styles.claseTest} flex h-screen flex-col px-6 py-12 lg:px-8`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Registro - Turnos médicos
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-2"
          action="#"
          method="POST"
          onSubmit={(e) => registerUser(e)}
        >
          <div>
            <label
              // for="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={changeUser}
              />
            </div>
          </div>
          <div>
            <label
              // for="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Apellido
            </label>
            <div className="mt-2">
              <input
                id="lastname"
                name="lastname"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={changeUser}
              />
            </div>
          </div>
          <div>
            <label
              // for="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Numero de DNI
            </label>
            <div className="mt-2">
              <input
                id="dni"
                name="dni"
                type="number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={changeUser}
              />
            </div>
          </div>

          <div>
            <label
              // for="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Correo electrónico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={changeUser}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                // type="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                // autocomplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={changeUser}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                // type="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Repite la contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="repeatPassword"
                name="password"
                type="password"
                // autocomplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={changeUser}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
