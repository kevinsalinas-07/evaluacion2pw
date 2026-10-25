import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button, Container } from 'reactstrap';

import HomePage from './pages/HomePage.jsx';
import JuegoPage from './pages/JuegoPage.jsx';
import FoodDeiPage from './pages/FoodDeiPage.jsx';

export default function AppRoot() {
  const [vista, setVista] = useState('home');

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar color="dark" dark expand="md" className="px-3 mb-4 shadow-sm">
        <NavbarBrand
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            setVista('home');
          }}
          className="fw-bold"
        >
          Evaluación II - Programación Web
        </NavbarBrand>

        <Nav className="ms-auto d-flex flex-row gap-2" navbar>
          <NavItem>
            <Button
              color={vista === 'home' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setVista('home')}
            >
              Inicio
            </Button>
          </NavItem>
          <NavItem>
            <Button
              color={vista === 'juego' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setVista('juego')}
            >
              Ejercicio 1
            </Button>
          </NavItem>
          <NavItem>
            <Button
              color={vista === 'food' ? 'success' : 'secondary'}
              size="sm"
              onClick={() => setVista('food')}
            >
              Ejercicio 2: Food DEI
            </Button>
          </NavItem>
        </Nav>
      </Navbar>

      <Container className="pb-5 flex-grow-1">
        {vista === 'home' && <HomePage cambiarVista={setVista} />}
        {vista === 'juego' && <JuegoPage />}
        {vista === 'food' && <FoodDeiPage />}
      </Container>
    </div>
  );
}