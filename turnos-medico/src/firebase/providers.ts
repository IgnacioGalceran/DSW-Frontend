import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { checkingCredentials, login, logout } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (dispatch: any) => {
  dispatch(checkingCredentials(true));
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;
    dispatch(login(result.user));
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    dispatch(logout());
    console.log(error);
  }
};
