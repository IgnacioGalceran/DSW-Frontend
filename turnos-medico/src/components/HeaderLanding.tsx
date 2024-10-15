"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "@/app/styles/headerlanding.module.css";
import { useRouter } from "next/navigation";

export const HeaderLanding = () => {
  const router = useRouter();

  const handlePortalClick = (e: any) => {
    e.preventDefault();
    router.push("/auth");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="sm" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="">Turnos Médicos</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className={styles["navbar-collapse"]}
          >
            <Nav className="me-auto">
              <Nav.Link href="#somos">¿Quiénes somos?</Nav.Link>
              <Nav.Link href="#especialidad">Especialidades</Nav.Link>
              <Nav.Link href="/auth">¿Cómo funciona?</Nav.Link>
            </Nav>
            <Nav className={styles["nav-portal"]}>
              <Nav.Link href="" onClick={handlePortalClick}>
                Portal - Pacientes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
