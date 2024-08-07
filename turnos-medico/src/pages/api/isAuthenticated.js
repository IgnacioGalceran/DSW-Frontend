import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "@/firebase/config";

export default async function isAuthenticated(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (user) {
        res.status(200).json({
          message: "Usuario logeado",
          result: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            token: user.accessToken,
          },
          error: false,
        });
      } else {
        res.status(401).json({
          message: "Usuario no logeado",
          result: null,
          error: true,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      result: null,
      error: true,
    });
  }
}
