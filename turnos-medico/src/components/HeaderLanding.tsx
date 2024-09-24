import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "@/app/styles/headerlanding.module.css";

export const HeaderLanding = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="sm" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="">Turnos Médicos</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="">¿Quiénes somos?</Nav.Link>
              <Nav.Link href="">Turnos</Nav.Link>
              <Nav.Link href="">Especialidades</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="" className={styles["nav-link"]}>
                Portal - Pacientes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
