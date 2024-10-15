"use client";
import { checkingCredentials, login, logout } from "@/store/auth/authSlice";
import { FirebaseAuth } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { API_URL } from "@/constants/const";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      await firebaseSignOut(FirebaseAuth);
      localStorage.removeItem("token");
      document.cookie = `token=; path=/; Secure; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `rol=; path=/; Secure; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      dispatch(logout());
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  const signIn = async (credentials: any) => {
    try {
      dispatch(checkingCredentials(true));
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
      document.cookie = `token=${token}; path=/; Secure; SameSite=Lax`;
      document.cookie = `rol=${userData.data.rol.nombre}; path=/; Secure; SameSite=Lax`;

      if (!user || !userData) {
        return;
      }

      dispatch(
        login({
          uid: user.uid,
          id: userData.data.id,
          email: user.email,
          displayName: `${userData.nombre} ${userData.apellido}`,
          funciones: userData.data.rol.funciones,
          rol: userData.data.rol.nombre,
        })
      );
      router.push("/");

      return user;
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    } finally {
      dispatch(checkingCredentials(false));
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
              document.cookie = `token=${token}; path=/; Secure; SameSite=Lax`;
              document.cookie = `rol=${userData.data.rol.nombre}; path=/; Secure; SameSite=Lax`;

              if (!userData || !user) return;

              dispatch(
                login({
                  uid: user.uid,
                  id: userData.data.id,
                  email: user.email,
                  displayName: `${userData.nombre} ${userData.apellido}`,
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
            document.cookie = `token=; path=/; Secure; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            document.cookie = `rol=; path=/; Secure; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        throw new NotFound("Usuario no encontrado", 404);
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      if (error.code === 404) {
        throw new NotFound("Usuario no encontrado", 404);
      } else {
        throw new Error(error.message);
      }
    }
  };

  return { signOut, signIn, tokenListener };
};
