"use client";
import React from "react";
import Header from "@/components/Header";
import styles from "./page.module.css";

import { DataObraSociales } from "./pages/obrasociales/page";

export default function Perfil() {
  return (
    <React.Fragment>
      <React.Fragment>
        <Header />
        {/* <DataObraSociales /> */}
        <div className={styles.container}></div>
      </React.Fragment>
    </React.Fragment>
  );
}
