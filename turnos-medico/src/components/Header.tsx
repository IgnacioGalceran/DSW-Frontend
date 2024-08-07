"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/auth/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { headerList } from "@/constants/paths";
import { signOut } from "@/firebase/helper";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/styles/header.module.css";

const Header = () => {
  const [openHeader, setOpenHeader] = useState<boolean>(false);
  const { isAuth } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <header className={styles.header}>
      <ul className={openHeader ? styles.openUl : ""}>
        <div className={styles.menu} onClick={() => setOpenHeader(!openHeader)}>
          <Image src={"/menu-white.png"} width={30} height={30} alt="" />
        </div>
        {headerList.map((e, index: number) => {
          let ePath = e.path.split("/").filter(Boolean);
          let path = pathname?.split("/").filter(Boolean) || "";
          console.log(ePath[ePath.length - 1] === path[path.length - 1]);
          return (
            <li
              key={index}
              className={
                ePath[ePath.length - 1] === path[path.length - 1]
                  ? styles.active
                  : ""
              }
              onClick={() => setOpenHeader(false)}
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
