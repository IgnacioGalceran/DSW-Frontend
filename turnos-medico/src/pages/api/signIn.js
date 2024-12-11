import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { FirebaseAuth } from "@/firebase/config";
import { API_URL } from "@/constants/const";

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

export default async function signIn(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const userLogin = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );

      const data = await userLogin.user?.getIdTokenResult();
      const userData = await getUserData(userLogin.user.uid, data.token);

      userData.data.email = userLogin.user.email;

      res.status(200).json({
        message: "Usuario logeado correctamente",
        result: {
          token: data.token,
          data: userData.data,
        },
        error: false,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: error.message, result: null, error: true });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
