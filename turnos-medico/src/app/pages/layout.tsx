"use client";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginPage from "../auth/page";
import CheckAuth from "../client";
import Header from "@/components/Header";
import styles from "./layout.module.css";
import Loader from "@/components/Loader";
import React from "react";
import { DataObraSociales } from "./obrasociales/page";

function Layout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { isAuth, isLoading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <Header />
      {/* <DataObraSociales /> */}
      <div className={styles.container}>{children}</div>
    </React.Fragment>
  );
}

export default Layout;
