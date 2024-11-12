"use client";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "@/components/Header";
import styles from "./layout.module.css";
import Loader from "@/components/Loader";
import React from "react";

function Layout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { isAuth, isLoading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className={styles.container}>{children}</div>
    </React.Fragment>
  );
}

export default Layout;
