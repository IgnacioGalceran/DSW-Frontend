"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { headerList } from "@/constants/paths";
import { useAuth } from "@/hooks/useAuth";
import styles from "@/app/styles/header.module.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [openHeader, setOpenHeader] = useState<boolean>(false);
  const [nombre, setNombre] = useState<string>("");
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

  useEffect(() => {
    if (displayName) {
      if (displayName.split(" ").length > 2) {
        setNombre(displayName.split(" ")[0] + " " + displayName.split(" ")[1]);
      } else {
        setNombre(displayName.split(" ")[0]);
      }
    }
  }, [displayName]);

  return (
    <header className={styles.header}>
      <span>Hola, {nombre} </span>
      <ul className={openHeader ? styles.openUl : ""}>
        <div className={styles.menu} onClick={() => setOpenHeader(!openHeader)}>
          <FontAwesomeIcon icon={faBars} className={styles.icons} />
        </div>

        {headerList.map((e, index: number) => {
          if (!hasPermission(e.rol)) return null;

          let ePath = e.path.split("/").filter(Boolean);
          let path = pathname?.split("/").filter(Boolean) || "";

          return (
            <li
              key={index}
              id={e.title}
              className={
                ePath[ePath.length - 1] === path[path.length - 1]
                  ? styles.active
                  : ""
              }
              onClick={() => {
                setOpenHeader(false);
                router.push(e.path);
              }}
            >
              <FontAwesomeIcon icon={e.icon} className={styles.icons} />
              <a className={styles.iconDescription}> {e.description}</a>
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
