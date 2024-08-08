import { getAuth, signOut } from "firebase/auth";
import { FirebaseApp } from "../../firebase/config";

export const FirebaseAuth = getAuth(FirebaseApp);

export default async function signOutHandler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    await signOut(FirebaseAuth);

    res.status(200).json({
      message: "Usuario deslogeado",
      result: null,
      error: false,
    });
  } catch (error) {
    console.error("Error signing out:", error);
    res.status(500).json({
      message: error.message,
      result: null,
      error: true,
    });
  }
}
