import styles from "@/app/styles/landing.module.css";

export default function Landing() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.menu}>
          <img src="/assets/menu-hamburguesa.png" />
        </div>
        <a href="#" className={styles.logo}>
          <img src="/assets/turnoonline.png" alt="Logo de la pagina" />
          <h2>Turnos médicos</h2>
        </a>
        <nav>
          <a href="" className={styles.navlink}>
            Inicio
          </a>
          <a href="" className={styles.navlink}>
            ¿Quiénes somos?
          </a>
          <a href="" className={styles.navlink}>
            Especialidades
          </a>
          <a href="" className={styles.navlink}>
            Turnos
          </a>
        </nav>
      </header>
      <div className={styles.familyIMGcontainer}>
        <img className={styles.imgFamily} src="/assets/familia1.jpg" alt="" />

      </div>
    </>
  );
}
