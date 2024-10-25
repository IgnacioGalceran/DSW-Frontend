"use client";
import Header from "@/components/Header";
import styles from "./page.module.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Perfil() {
  return (
    <React.Fragment>
      <React.Fragment>
        <Header />
        <div className={styles.container}>
          <h1>Container</h1>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
}
