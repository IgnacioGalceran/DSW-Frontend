import { getAuth } from "firebase/auth";

export const checkAuth = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(user);

  if (user) {
    user
      .getIdToken(true)
      .then((idToken) => {
        console.log(idToken);
        fetch("http://localhost:4000/api/auth/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            /* cualquier otro dato si es necesario */
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => {
        console.error("Error fetching ID token:", error);
      });
  }
};
