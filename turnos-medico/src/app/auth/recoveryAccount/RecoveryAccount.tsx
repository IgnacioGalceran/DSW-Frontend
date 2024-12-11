"use client";

import React, { useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "@/components/Input";

import { FirebaseAuth } from "@/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

import styles from "../login.module.css";

type RecoveryAccountProps = {
  resetPassword: boolean;
  setResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RecoveryAccount({
  setResetPassword,
}: RecoveryAccountProps) {
  const [resetPasswordEmail, setResetPasswordEmail] = useState({
    email: "",
  });

  const changeResetPasswordEmail = (event: any) => {
    setResetPasswordEmail({
      ...resetPasswordEmail,
      [event.target.name]: event.target.value,
    });
  };

  const handleSendChangePasswordEmail = async (e: any) => {
    e.preventDefault();
    await sendPasswordResetEmail(FirebaseAuth, resetPasswordEmail.email);
  };

  return (
    <form
      className={styles.resetPassword}
      action="#"
      method="POST"
      onSubmit={(e) => handleSendChangePasswordEmail(e)}
    >
      <Input
        placeholder="Email de recuperación"
        type="email"
        name="email"
        value={resetPasswordEmail.email}
        onChange={changeResetPasswordEmail}
      />

      <button
        type="submit"
        className="flex justify-center rounded-md bg-sky-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-800 focus-visible:outline-offset-2"
      >
        Enviar email
      </button>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className={styles.goBack}
        onClick={() => setResetPassword(false)}
      />
    </form>
  );
}
