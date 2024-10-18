"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import Toast from "@/components/Toast";
import styles from "@/app/styles/toastContext.module.css";

interface ToastContextProps {
  showToast: (
    message: string,
    status: "PROGRESS" | "OK" | "FAIL",
    duration?: number
  ) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<
    {
      id: number;
      duration: number;
      message: string;
      status: "PROGRESS" | "OK" | "FAIL";
    }[]
  >([]);
  const [nextId, setNextId] = useState(1);

  const showToast = useCallback(
    (
      message: string,
      status: "PROGRESS" | "OK" | "FAIL",
      duration: number = 5000
    ) => {
      const id = nextId;
      setNextId(nextId + 1);
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, duration, message, status },
      ]);

      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        );
      }, duration);
    },
    [nextId]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={styles.toastContainer}>
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            duration={toast.duration}
            message={toast.message}
            status={toast.status} // Pasar el status al Toast
            onClose={() =>
              setToasts((prevToasts) =>
                prevToasts.filter((t) => t.id !== toast.id)
              )
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
