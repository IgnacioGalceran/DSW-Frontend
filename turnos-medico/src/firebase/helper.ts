import { FRONT_URL } from "@/constants/const";

export const tokenListener = async () => {
  try {
    const response = await fetch(`${FRONT_URL}/isAuthenticated`);
    const { result, error } = await response.json();
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
