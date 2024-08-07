"use client";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/auth/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { headerList } from "@/constants/paths";
import Link from "next/link";
import styles from "@/app/styles/header.module.css";

const Header = () => {
  const { isAuth } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        console.log("deslogeado");
      })
      .catch((error) => {
        throw new Error(error);
      });

    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <header className={styles.header}>
      <ul className={styles.ul}>
        {headerList.map((e, index: number) => {
          let ePath = e.path.split("/");
          let path: string = pathname || "";
          return (
            <li
              key={index}
              className={
                ePath[ePath.length - 1] === path[path.length - 1]
                  ? styles.active
                  : ""
              }
            >
              <Link href={e.path}>{e.title}</Link>
            </li>
          );
        })}

        {isAuth && <li onClick={() => handleLogout()}>Logout</li>}
      </ul>
    </header>
  );
};

export default Header;
