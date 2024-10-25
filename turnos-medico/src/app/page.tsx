"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginPage from "./auth/page";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import styles from "./page.module.css";
import CheckAuth from "./client";
import Landing from "@/components/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export default function Perfil() {
  const { isAuth, isLoading } = useSelector((state: any) => state.auth);
  return (
    <React.Fragment>
      {isLoading && <Loader />}
      {!isAuth && !isLoading && <Landing />}
      {isAuth && !isLoading && (
        <React.Fragment>
          <Header />
          <div className={styles.container}>
            <h1>Container</h1>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
