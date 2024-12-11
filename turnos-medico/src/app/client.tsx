"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkingCredentials, login } from "@/store/auth/authSlice";
import { useAuth } from "@/hooks/useAuth";

export default function CheckAuth() {
  const dispatch = useDispatch();
  const { tokenListener } = useAuth();

  useEffect(() => {
    const setupTokenListener = async () => {
      try {
        await tokenListener(dispatch);
      } catch (error) {
        console.error("Error setting up token listener:", error);
      } finally {
        dispatch(checkingCredentials(false));
      }
    };

    setupTokenListener();
  }, [dispatch]);

  return null;
}
