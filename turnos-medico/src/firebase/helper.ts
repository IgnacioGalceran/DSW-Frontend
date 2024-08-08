import { FRONT_URL } from "@/constants/const";
import { checkingCredentials, login } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const tokenListener = async () => {
  try {
    const response = await fetch(`${FRONT_URL}/isAuthenticated`);
    const { result, error } = await response.json();
    console.log(result);
    if (!error) {
      localStorage.setItem("token", result.token);
      return result;
    } else {
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (
  credentials: {
    email: string;
    password: string;
  },
  dispatch: any,
  router: any
) => {
  dispatch(checkingCredentials(true));

  try {
    const bodyData = {
      email: credentials.email,
      password: credentials.password,
    };
    console.log("signin");
    const response = await fetch(`${FRONT_URL}/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const { result, error } = await response.json();
    console.log(result);
    if (!error) {
      dispatch(login(result.data));
      localStorage.setItem("token", result.token);
      router.push("/pages/medicos");
    }
  } catch (error) {
    // dispatch(logout());
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    console.log("asd");
    const response = await fetch(`${FRONT_URL}/signOut`);
    const { result, error } = await response.json();
    if (!error) {
      localStorage.removeItem("token");
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
