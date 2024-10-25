import styles from "@/app/styles/landing.module.css";
import Carousel from "react-bootstrap/Carousel";
import { HeaderLanding } from "./HeaderLanding";
import React from "react";

export default function Landing() {
  return (
    <React.Fragment>
      <HeaderLanding />
      <Carousel fade indicators={false} controls={false} interval={5000}>
        <Carousel.Item>
          <div className={styles["img-container"]}>
            <img className={styles.img} src="/assets/designer.jpeg" alt="" />
          </div>
          <Carousel.Caption>
            <div className={styles.text}>
              <h3>Turnos al instante.</h3>
              <p>
                Obtené turnos médicos de manera rápida y sencilla para cuidarte
                a vos y a tu familia.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles["img-container"]}>
            <img className={styles.img} src="/assets/designer2.jpeg" alt="" />
          </div>
          <Carousel.Caption>
            <div className={styles.text}>
              <h3>Desde cualquier dispositivo.</h3>
              <p>Gestioná tu turno médico en cualquier momento y lugar.</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles["img-container"]}>
            <img className={styles.img} src="/assets/designer1.jpeg" alt="" />
          </div>
          <Carousel.Caption>
            <div className={styles.text}>
              <h3> Profesionales y especialidades.</h3>
              <p>Cartilla con profesionales médicos y especialistas.</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className={styles.buttonPortal}>
        <p>
          Ingresá al <b>Portal</b>
        </p>
      </div>

      <section className={styles.customSection}>
        <h2 id="#somos">¿Quiénes somos?</h2>
        <div className={styles.divider}></div>

        <p>
          En <b>Turnos Médicos</b>, creemos que la salud debe estar al alcance
          de todos de manera rápida y sencilla. Somos una plataforma dedicada a
          facilitar la gestión de turnos médicos, brindando a nuestros usuarios
          una experiencia accesible desde cualquier dispositivo.
        </p>
        <p>
          Nuestra misión es eliminar las barreras tradicionales en la
          programación de citas médicas, permitiendo que las personas encuentren
          y reserven sus consultas con especialistas en pocos clics. Trabajamos
          en conjunto con clínicas y profesionales de la salud para ofrecerte
          una amplia gama de especialidades, siempre con el compromiso de
          mejorar tu bienestar. Nos destacamos por la simplicidad, rapidez y
          seguridad en el manejo de tu información, para que puedas concentrarte
          en lo más importante: tu salud.
        </p>
      </section>
      <section className={styles.customSection}>
        <h2 id="#especialidad">Especialidades Médicas a tu Alcance</h2>
        <div className={styles.divider}></div>
        <p>
          En nuestra plataforma de turnos médicos, ofrecemos acceso rápido y
          sencillo a una amplia gama de <strong>especialidades médicas</strong>,
          adaptadas a tus necesidades de salud. Desde consultas generales hasta
          atención especializada, contamos con un equipo de profesionales
          altamente capacitados para brindarte el mejor cuidado en diversas
          áreas de la medicina.
        </p>

        <h3>Especialidades disponibles:</h3>
        <ul>
          <li>
            <strong>Medicina General:</strong> Ideal para consultas de rutina,
            chequeos y orientación en el cuidado de tu salud.
          </li>
          <li>
            <strong>Pediatría:</strong> Atención especializada para la salud y
            el bienestar de los más pequeños de la familia.
          </li>
          <li>
            <strong>Cardiología:</strong> Control y seguimiento de la salud del
            corazón y el sistema circulatorio.
          </li>
          <li>
            <strong>Ginecología:</strong> Cuidado integral de la salud femenina,
            desde controles hasta tratamientos especializados.
          </li>
          <li>
            <strong>Dermatología:</strong> Diagnóstico y tratamiento de
            enfermedades de la piel, el cabello y las uñas.
          </li>
          <li>
            <strong>Odontología:</strong> Cuida tu sonrisa con nuestros expertos
            en salud bucal y dental.
          </li>
          <li>
            <strong>Traumatología:</strong> Atención para lesiones óseas,
            musculares y articulares.
          </li>
          <li>
            <strong>Oftalmología:</strong> Revisión y tratamiento de problemas
            visuales y oculares.
          </li>
          <li>
            <strong>Nutrición:</strong> Planes alimentarios personalizados para
            mejorar tu salud y bienestar general.
          </li>
        </ul>
      </section>
      <section className={styles.customSection}>
        <h2 id="#comofunciona">¿Cómo funciona?</h2>
        <div className={styles.divider}></div>
        <p>
          Selecciona la especialidad que necesitas, elige el profesional y la
          fecha y hora que mejor se adapte a tu agenda. ¡Es fácil, rápido y sin
          complicaciones!
        </p>
        <p>
          Con nuestra plataforma, tienes la tranquilidad de recibir atención
          médica de calidad, de manera accesible y conveniente, siempre que lo
          necesites.
        </p>
      </section>
      <footer></footer>
    </React.Fragment>
  );
}
