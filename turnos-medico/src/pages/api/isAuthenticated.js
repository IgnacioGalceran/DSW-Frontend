import { onIdTokenChanged } from "firebase/auth";
import { FirebaseAuth } from "@/firebase/config";
import { API_URL } from "../../constants/const";

const getUserData = async (uid, token) => {
  const response = await fetch(`${API_URL}/auth/getUserData/${uid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export default async function isAuthenticated(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    onIdTokenChanged(FirebaseAuth, async (user) => {
      if (user) {
        const data = await user?.getIdTokenResult();
        const userData = await getUserData(user.uid, data.token);

        console.log("isAuth");

        res.status(200).json({
          message: "Usuario logueado",
          result: {
            uid: user.uid,
            email: user.email,
            displayName: `${userData.data?.nombre} ${userData.data?.apellido}`,
            token: user.accessToken,
          },
          error: false,
        });
      } else {
        res.status(401).json({
          message: "Usuario no logueado",
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
