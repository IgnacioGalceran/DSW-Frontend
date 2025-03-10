import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { checkingCredentials, login, logout } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants/const";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (getUserData: any, dispatch: any) => {
  try {
    const result: any = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, uid, accessToken } = result.user;

    const response = await fetch(`${API_URL}/auth/checkUser/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName,
        email,
        uid,
      }),
    });

    const data = await response.json();

    if (!data.error) {
      let userData = await getUserData(uid, accessToken);

      localStorage.setItem("token", accessToken);

      if (!result.user || !userData) {
        return;
      }

      dispatch(
        login({
          uid: uid,
          id: userData.data.id,
          tipoDni: userData.data.tipoDni,
          dni: userData.data.dni,
          email: email,
          displayName: `${userData.data.nombre} ${userData.data.apellido}`,
          funciones: userData.data.rol.funciones,
          rol: userData.data.rol.nombre,
        })
      );
    }
  } catch (error) {}
};
