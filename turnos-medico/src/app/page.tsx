"use client";
import Header from "@/components/Header";
import styles from "./page.module.css";
import React from "react";
import { DataProfile } from "./paciente/perfil/page";

export default function Perfil() {
  return (
    <React.Fragment>
      <React.Fragment>
        <Header />

        <div className={styles.container}></div>
      </React.Fragment>
    </React.Fragment>
  );
}
