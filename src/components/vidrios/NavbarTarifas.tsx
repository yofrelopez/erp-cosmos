import React, { useState, useContext } from "react";
import { VidriosContext } from "../../context/vidrios/VidriosContext";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";



const NavbarTarifas: React.FC = () => {

  const {activeMenuBotones, setActiveMenuBotones} = useContext(VidriosContext)

  const [isOpen, setIsOpen] = useState(false);


  const toggle = () => setIsOpen(!isOpen);

  const handleSelect = (selectedKey: string | null) => {
    setActiveMenuBotones(selectedKey as string);
    // Aquí puedes agregar lógica adicional para filtrar el contenido basado en la selección
  };

  return (
    <Navbar color="light" light expand="md">
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem
            active={activeMenuBotones === "Vidrio"}
            className={`${activeMenuBotones === "Vidrio" ? "bg-warning" : ""}`}
          >
            <NavLink href="#Vidrio" onClick={() => handleSelect("Vidrio")}
              className={`${activeMenuBotones === "Vidrio" ? "active fw-medium" : ""}`}
            >
              Vidrios
            </NavLink>
          </NavItem>
          <NavItem
            active={activeMenuBotones === "Espejo"}
            className={`${activeMenuBotones === "Espejo" ? "bg-warning" : ""}`}          
          >
            <NavLink href="#Espejo" onClick={() => handleSelect("Espejo")}
              className={`${activeMenuBotones === "Espejo" ? "active fw-medium" : ""}`}
            >
              Espejos
            </NavLink>
          </NavItem>
          <NavItem active={activeMenuBotones === "Ventana"}
            className={`${activeMenuBotones === "Ventana" ? "bg-warning" : ""}`}          
          >
            <NavLink href="#Ventana" onClick={() => handleSelect("Ventana")}
              className={`${activeMenuBotones === "Ventana" ? "active fw-medium" : ""}`}            
            >
              Ventanas
            </NavLink>
          </NavItem>
          <NavItem
            active={activeMenuBotones === "Puerta"}
            className={`${activeMenuBotones === "Puerta" ? "bg-warning" : ""}`}          
          >
            <NavLink href="#Puerta" onClick={() => handleSelect("Puerta")}
              className={`${activeMenuBotones === "Puerta" ? "active fw-medium" : ""}`}
            >
              Puertas
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarTarifas;
