"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginPage from "./auth/page";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import styles from "./page.module.css";
import CheckAuth from "./client";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuth, isLoading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    console.log(isAuth);
    setLoading(false);
  }, []);

  return (
    <>
      {(isLoading || loading) && <Loader />}
      {!isAuth && !isLoading && !loading && <LoginPage />}
      {isAuth && !isLoading && !loading && (
        <>
          <Header />
          <div className={styles.container}>
            <h1>Container</h1>
          </div>
        </>
      )}
    </>
  );
}
