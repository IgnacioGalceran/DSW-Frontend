"use client";
import React from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/firebase/providers";

import Loader from "@/components/Loader";
import styles from "./login.module.css";
import { useAuth } from "@/hooks/useAuth";

import { RecoveryAccount } from "./recoveryAccount/page";

import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const { initialState, status, isLoading } = useSelector(
    (state: any) => state.auth
  );

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [resetPassword, setResetPassword] = useState<boolean>(false);

  const changeUser = (event: any) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  async function handleGoogleLogin(e: any) {
    e.preventDefault();
    await signInWithGoogle(dispatch);
    router.push("/");
  }

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      await signIn(credentials);
    } catch (error: any) {
      console.log(error);
      showToast(error.message, "FAIL", 3000);
    }
  }

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      {!resetPassword && (
        <div
          className={`${styles.claseTest}  flex h-screen flex-col px-6 py-12 lg:px-8`}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-24 w-24 sm:h-30 sm:w-30 md:h-40 md:w-40 lg:h-56 lg:w-56"
              src="/assets/turnos.png"
              alt="Logo"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Inicio de sesión - Turnos médicos
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={(e) => handleLogin(e)}
            >
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
                    className={`${styles.input} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
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
                  <div
                    className="text-sm"
                    onClick={() => setResetPassword(true)}
                  >
                    <a className="font-semibold text-indigo-600 hover:text-indigo-500">
                      ¿Olvidó su contraseña?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    // autocomplete="current-password"
                    required
                    className={`${styles.input} block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                    onChange={changeUser}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-800 focus-visible:outline-offset-2"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              ¿No tienes cuenta?
              <a
                href="#"
                className=" ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => router.push("auth/register")}
              >
                Regístrate
              </a>
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full max-w-xs py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.8 0 6.8 1.4 9.1 3.7l6.8-6.8C35.8 2.6 30.4 0 24 0 14.6 0 6.7 5.8 3 14.2l8.2 6.4C12.9 13.3 18 9.5 24 9.5z"
                ></path>
                <path
                  fill="#34A853"
                  d="M46.6 24.1c0-1.3-.1-2.7-.4-3.9H24v7.8h12.7c-.6 3.4-2.5 6.3-5.2 8.2l8.2 6.4c4.8-4.4 7.9-10.8 7.9-18.5z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M12.5 29.3C11 25.9 11 22.1 12.5 18.7L3.3 12.3C-1.1 19.3-1.1 28.7 3.3 35.7l9.2-6.4z"
                ></path>
                <path
                  fill="#EA4335"
                  d="M24 48c6.5 0 12-2.1 16.1-5.7l-8.2-6.4c-2.2 1.5-5 2.4-7.9 2.4-6 0-11-4.1-12.8-9.7L3 35.7C6.8 43.2 14.6 48 24 48z"
                ></path>
              </svg>
              Google
            </button>
          </div>
        </div>
      )}
      {resetPassword && (
        <RecoveryAccount
          resetPassword={resetPassword}
          setResetPassword={setResetPassword}
        />
      )}
    </React.Fragment>
  );
}
