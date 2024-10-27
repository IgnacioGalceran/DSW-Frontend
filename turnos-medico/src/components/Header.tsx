"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { headerList } from "@/constants/paths";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import styles from "@/app/styles/header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [openHeader, setOpenHeader] = useState<boolean>(false);
  const { isAuth, rol } = useSelector((state: any) => state.auth);
  const { signOut } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    router.push("/auth");
  };

  const hasPermission = (roles: string[]): boolean => {
    let rolEncontrado = roles.find((role: string) => role === rol);

    if (!rolEncontrado) return false;

    return true;
  };

  return (
    <header className={styles.header}>
      <ul className={openHeader ? styles.openUl : ""}>
        <div className={styles.menu} onClick={() => setOpenHeader(!openHeader)}>
          <Image src="/assets/menu-white.png" alt="" width={30} height={30} />
        </div>
        {headerList.map((e, index: number) => {
          if (!hasPermission(e.rol)) return;

          let ePath = e.path.split("/").filter(Boolean);
          let path = pathname?.split("/").filter(Boolean) || "";

          return (
            <li
              key={index}
              className={
                ePath[ePath.length - 1] === path[path.length - 1]
                  ? styles.active
                  : ""
              }
              onClick={() => {
                setOpenHeader(false);
                router.replace(e.path);
              }}
            >
              <FontAwesomeIcon icon={e.icon} />
            </li>
          );
        })}

        {isAuth && (
          <li onClick={() => handleLogout()}>
            <FontAwesomeIcon icon={faSignOut} className={styles.signOut} />
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
