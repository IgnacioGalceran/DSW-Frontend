"use client";
import { ReactNode } from "react";
import Header from "@/components/Header";
import styles from "./layout.module.css";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className={styles.container}>{children}</div>
    </>
  );
}

export default Layout;
