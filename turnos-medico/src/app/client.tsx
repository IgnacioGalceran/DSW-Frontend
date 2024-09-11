"use client";
import { tokenListener } from "@/firebase/helper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkingCredentials, login } from "@/store/auth/authSlice";

export default function CheckAuth() {
  const dispatch = useDispatch();
  console.log("client");
  useEffect(() => {
    const setupTokenListener = async () => {
      try {
        // const user = await tokenListener(dispatch);
        // const token = localStorage.getItem("token");
      } catch (error) {
        console.error("Error setting up token listener:", error);
      } finally {
        dispatch(checkingCredentials(false));
      }
    };

    setupTokenListener();
  }, []);

  return null;
}
