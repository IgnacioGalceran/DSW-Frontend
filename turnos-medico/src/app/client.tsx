"use client";
import { tokenListener } from "@/firebase/helper";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { checkingCredentials, login } from "@/store/auth/authSlice";

export default function CheckAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("client");
    const setupTokenListener = async () => {
      try {
        dispatch(checkingCredentials(true));
        const user = await tokenListener();
        const token = localStorage.getItem("token");

        console.log(user);

        if (token) {
          dispatch(login(user));
        }
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
