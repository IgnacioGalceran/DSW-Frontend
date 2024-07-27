import React from "react";
import styles from "@/app/styles/loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.overlay}></div>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
