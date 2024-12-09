"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants/const";
import Loader from "@/components/Loader";
import { useToast } from "@/context/ToastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "@/app/styles/verify.module.css";

const VerifyEmail = ({ searchParams }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const { showToast } = useToast();
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
        {!searchParams?.get("continueUrl") && (
          <h2 className={styles.subtitle}>
            Para ingresar a la aplicación, usted primero debe verificar su
            dirección de email.
          </h2>
        )}
        {loading && <h2 className={styles.subtitle}>Verificando usuario</h2>}
        {success && !loading && (
          <h2 className={styles.subtitle}>
            Usuario verificado correctamente! Redirigiendo...
          </h2>
        )}
      </div>
      {!searchParams?.get("continueUrl") && (
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.goBack}
          onClick={() => {
            router.replace("/auth");
          }}
        />
      )}
    </div>
  );
};

export default VerifyEmail;
