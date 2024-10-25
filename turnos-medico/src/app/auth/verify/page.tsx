"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_URL } from "@/constants/const";
import Loader from "@/components/Loader";
import { useToast } from "@/context/ToastContext";
import styles from "./verify.module.css";

const Verify = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    const verifyUser = async () => {
      try {
        setLoading(true);
        if (searchParams) {
          const continueUrl = searchParams.get("continueUrl");
          const uid = continueUrl?.toString().split("=")[1];

          if (uid) {
            let response = await fetch(`${API_URL}/auth/verifyUser/${uid}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            let result = await response.json();

            if (!result.error) {
              showToast("Verificación completada", "OK", 3000);
              setSuccess(true);
              setTimeout(() => {
                router.replace("/");
              }, 4000);
            }
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Turnos Médicos</h1>
        {loading && <h2 className={styles.subtitle}>Verificando usuario</h2>}
        {success && !loading && (
          <h2 className={styles.subtitle}>
            Usuario verificado correctamente! Redirigiendo...
          </h2>
        )}
      </div>
    </div>
  );
};

export default Verify;
