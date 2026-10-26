import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

export default function HomePage({ cambiarVista }) {
  return (
    <Row className="mt-3">
      <Col xs="12" md="6" className="mb-3">
        <Card className="shadow-sm h-100">
          <CardBody className="d-flex flex-column">
            <CardTitle tag="h4" className="fw-bold text-primary">
              Ejercicio 1: Adivina el Número
            </CardTitle>
            <CardText className="flex-grow-1">
              Generación de número aleatorio entre 1 y 100 en Express y control de historial de intentos con useState.
            </CardText>
            <Button color="primary" onClick={() => cambiarVista('juego')}>
              Ir al Ejercicio 1
            </Button>
          </CardBody>
        </Card>
      </Col>

      <Col xs="12" md="6" className="mb-3">
        <Card className="shadow-sm h-100">
          <CardBody className="d-flex flex-column">
            <CardTitle tag="h4" className="fw-bold text-success">
              Ejercicio 2: Caso Food DEI S.A. de R.L.
            </CardTitle>
            <CardText className="flex-grow-1">
              Gestión de stock de platillos en memoria, validación de presupuesto diario y carrito lateral con tiempo límite.
            </CardText>
            <Button color="success" onClick={() => cambiarVista('food')}>
              Ir al Ejercicio 2
            </Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}