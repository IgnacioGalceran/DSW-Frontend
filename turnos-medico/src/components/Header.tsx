"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/auth/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { headerList } from "@/constants/paths";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/styles/header.module.css";
import { useAuth } from "@/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const [openHeader, setOpenHeader] = useState<boolean>(false);
  const { isAuth, rol, displayName } = useSelector((state: any) => state.auth);
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
          <FontAwesomeIcon icon={faBars} className={styles.img} />
        </div>

        {headerList.map((e, index: number) => {
          if (!hasPermission(e.rol)) return null;

          let ePath = e.path.split("/").filter(Boolean);
          let path = pathname?.split("/").filter(Boolean) || "";

          return (
            <>
              <nav>
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
              </nav>
            </>
          );
        })}

        {isAuth && (
          <li style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
            Cerrar sesión
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
