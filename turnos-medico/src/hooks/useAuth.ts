"use client";
import { checkingCredentials, login, logout } from "@/store/auth/authSlice";
import { FirebaseAuth } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  sendEmailVerification,
  getAuth,
  User,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { API_URL } from "@/constants/const";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      await firebaseSignOut(FirebaseAuth);
      localStorage.removeItem("token");
      document.cookie = `token=; path=/; Secure; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `rol=; path=/; Secure; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

      dispatch(logout());
    } catch (error) {}
  };

  const signIn = async (credentials: any) => {
    try {
      setLoading(true);
      const { email, password } = credentials;
      const userCredential = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userData = await getUserData(user.uid, token);
      localStorage.setItem("token", token);

      if (!user || !userData) {
        return;
      }

      dispatch(
        login({
          uid: user.uid,
          id: userData.data.id,
          tipoDni: userData.data.tipoDni,
          dni: userData.data.dni,
          email: user.email,
          displayName: `${userData.data.nombre} ${userData.data.apellido}`,
          funciones: userData.data.rol.funciones,
          rol: userData.data.rol.nombre,
        })
      );

      if (userData.data.rol.nombre === "Paciente") {
        router.push("/paciente/turnos");
      } else if (userData.data.rol.nombre === "Medico") {
        router.push("/medico/turnos");
      } else if (userData.data.rol.nombre === "Administrador") {
        router.push("/pages/perfil");
      }

      return user;
    } catch (error: any) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        throw new Error("Datos de usuario incorrectos");
      }

      if (
        error.message ===
        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
      ) {
        throw new Error("Acceso limitado debido a varios intentos fallidos.");
      }
    } finally {
      setLoading(false);
    }
  };

  const tokenListener = async (dispatch: any) => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        FirebaseAuth,
        async (user: any) => {
          if (user) {
            try {
              const token = await user.getIdToken();
              const userData = await getUserData(user.uid, token);

              localStorage.setItem("token", token);

              if (!userData || !user) return;

              dispatch(
                login({
                  uid: user.uid,
                  id: userData.data.id,
                  email: user.email,
                  displayName: `${userData.data.nombre} ${userData.data.apellido}`,
                  funciones: userData.data.rol.funciones,
                  rol: userData.data.rol.nombre,
                })
              );

              resolve(user);
            } catch (error) {
              dispatch(logout());
            }
          } else {
            localStorage.removeItem("token");
            dispatch(logout());
            resolve(null);
          }
        },
        reject
      );
    });
  };

  class NotFound extends Error {
    code: number;

    constructor(message: string, code: number) {
      super(message);
      this.code = code;
    }
  }

  const getUserData = async (uid: string, token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/getUserData/${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        throw new NotFound("Usuario no encontrado", 404);
      }

      const data = await response.json();

      document.cookie = `token=${token}; path=/; Secure; SameSite=Lax`;
      document.cookie = `rol=${data.data.rol.nombre}; path=/; Secure; SameSite=Lax`;
      document.cookie = `verificado=${data.data.verificado}; path=/; Secure; SameSite=Lax`;

      return data;
    } catch (error: any) {
      if (error.code === 404) {
        throw new NotFound("Usuario no encontrado", 404);
      } else {
        throw new Error(error.message);
      }
    }
  };

  const sendVerificationEmail = async (usuario: User) => {
    setLoading(true);
    const actionCodeSettings = {
      url: `http://localhost:3000/pages/verify/?uid=${usuario.uid}`,
      handleCodeInApp: true,
    };

    try {
      if (usuario) {
        await sendEmailVerification(usuario, actionCodeSettings);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    signOut,
    signIn,
    tokenListener,
    sendVerificationEmail,
    getUserData,
    loading,
  };
};
