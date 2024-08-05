import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { FirebaseAuth } from "@/app/firebase/config";

export default async function login(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const userLogin = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const data = await userLogin.user?.getIdTokenResult();

    res.status(200).json({
      message: "Solicitud recibida correctamente",
      token: data.token,
      error: false,
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
