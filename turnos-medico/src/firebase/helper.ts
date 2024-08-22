"use client";
import { checkingCredentials, login, logout } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import { FirebaseAuth } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { API_URL } from "@/constants/const";

class NotFound extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export const tokenListener = async (dispatch: any) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      FirebaseAuth,
      async (user: any) => {
        if (user) {
          const token = await user.getIdToken();
          const userData = await getUserData(user.uid, token);
          localStorage.setItem("token", token);

          let displayName = `${userData.data.nombre} ${userData.data.apellido}`;

          dispatch(
            login({
              uid: user.uid,
              email: user.email,
              displayName,
            })
          );

          resolve(user);
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

export const signIn = async (credentials: any, dispatch: any, router: any) => {
  dispatch(checkingCredentials(true));

  try {
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

    let displayName = `${userData.data.nombre} ${userData.data.apellido}`;

    dispatch(
      login({
        uid: user.uid,
        email: user.email,
        displayName,
      })
    );

    router.push("/");
    return user;
  } catch (error) {
    console.log("Error al iniciar sesión:", error);
    dispatch(checkingCredentials(false));
  }
};

export const signOut = async (dispatch: any) => {
  try {
    await firebaseSignOut(FirebaseAuth);

    localStorage.removeItem("token");
    dispatch(logout());
  } catch (error) {
    console.log("Error al cerrar sesión:", error);
  }
};

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
