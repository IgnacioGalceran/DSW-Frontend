"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/header.module.css";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <header className={styles.header}>
      <ul className={styles.ul}>
        <li></li>
        {isAuth && <li onClick={handleLogout}>Logout</li>}
      </ul>
    </header>
  );
};

export default Header;
