"use client";
import React, { useEffect, useRef } from "react";
import styles from "@/app/styles/toast.module.css";

interface ToastProps {
  message: string;
  duration: number;
  status: "PROGRESS" | "OK" | "FAIL";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  duration,
  status,
  onClose,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      const progressBar = progressRef.current;
      let start: number = Date.now();
      let timer: NodeJS.Timeout;

      const updateProgress = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min((elapsed / duration) * 100, 100);
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
          onClose();
          clearInterval(timer);
        }
      };

      timer = setInterval(updateProgress, 100);
      return () => clearInterval(timer);
    }
  }, [duration, onClose]);

  const getStatusClass = (status: "PROGRESS" | "OK" | "FAIL") => {
    switch (status) {
      case "PROGRESS":
        return styles.procesando;
      case "OK":
        return styles.pagado;
      case "FAIL":
        return styles.rechazado;
      default:
        return "";
    }
  };

  return (
    <div
      id={`${getStatusClass(status)}`}
      className={`${styles.toast} ${getStatusClass(status)}`}
      style={{ animationDuration: `${duration}ms` }}
    >
      <span>{message}</span>
      <div className={styles.toastProgressContainer}>
        <div className={styles.toastProgress} ref={progressRef}></div>
      </div>
      <button className={styles.toastClose} onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Toast;
