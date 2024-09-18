import styles from "@/app/styles/landing.module.css";
import Carousel from "react-bootstrap/Carousel";

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
      <Carousel fade indicators={false} controls={false} interval={5000}>
        <Carousel.Item>
          <img className={styles.img} src="/assets/familia1.jpg" alt="" />
          <Carousel.Caption>
            <h3 className={styles.text}>Turnos al instante.</h3>
            <p>
              Obtené turnos médicos de manera rápida y sencilla para cuidarte a
              vos y a tu familia.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className={styles.img} src="/assets/adultotelefono.jpg" alt="" />
          <Carousel.Caption>
            <h3 className={styles.text}>Desde cualquier dispositivo.</h3>
            <p>Gestioná tu turno médico en cualquier momento y lugar.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className={styles.img} src="/assets/equipomedico.png" alt="" />
          <Carousel.Caption>
            <h3 className={styles.text}> Profesionales y especialidades.</h3>
            <p>Cartilla con profesionales médicos y especialistas.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
