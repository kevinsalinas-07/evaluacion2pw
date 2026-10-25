import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Alert,
  UncontrolledAlert,
  Badge,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import {
  obtenerMenuApi,
  obtenerReservaApi,
  agregarPlatoApi,
  actualizarPorcionesApi,
  eliminarPlatoApi,
  confirmarReservaApi,
  resetearTurnoApi,
  restaurarStockApi,
  reiniciarReservaApi
} from '../api/foodDeiApi';

export default function FoodDeiPage() {
  const [menu, setMenu] = useState([]);
  const [reserva, setReserva] = useState({ saldo: 25.00, itemsReservados: [], total: 0.00 });
  const [errorMsg, setErrorMsg] = useState('');
  const [exitoMsg, setExitoMsg] = useState('');
  const [cargando, setCargando] = useState(false);
  const [segundos, setSegundos] = useState(120);

  const sincronizarDatos = async () => {
    try {
      setCargando(true);
      const [datosMenu, datosReserva] = await Promise.all([
        obtenerMenuApi(),
        obtenerReservaApi()
      ]);
      setMenu(datosMenu);
      setReserva(datosReserva);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    sincronizarDatos();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          manejarExpiracion();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const manejarExpiracion = async () => {
    try {
      setCargando(true);
      const data = await reiniciarReservaApi();
      setMenu(data.menu);
      setReserva(data.reserva);
      setExitoMsg('');
      setErrorMsg('Tiempo agotado (02:00). Se cerró la reserva y se restauró el stock.');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setCargando(false);
    }
  };

  // Reinicia el saldo a $25.00 manteniendo descontado el stock ya confirmado
  const manejarNuevaReserva = async () => {
    setErrorMsg('');
    setExitoMsg('');
    try {
      setCargando(true);
      const data = await resetearTurnoApi();
      setMenu(data.menu);
      setReserva(data.reserva);
      setSegundos(120);
      setExitoMsg(data.mensaje);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setCargando(false);
    }
  };

  // SOLO restaura el stock de la cocina (12, 8, 5, 15) sin modificar el saldo ni el temporizador
  const manejarRestaurarCocina = async () => {
    setErrorMsg('');
    setExitoMsg('');
    try {
      setCargando(true);
      const data = await restaurarStockApi();
      setMenu(data.menu);
      setExitoMsg(data.mensaje);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setCargando(false);
    }
  };

  const manejarAgregar = async (id) => {
    setErrorMsg('');
    setExitoMsg('');
    try {
      setCargando(true);
      await agregarPlatoApi(id, 1);
      await sincronizarDatos();
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setCargando(false);
    }
  };

  const manejarPorciones = async (id, nuevaCantidad) => {
    setErrorMsg('');
    setExitoMsg('');
    try {
      setCargando(true);
      await actualizarPorcionesApi(id, nuevaCantidad);
      await sincronizarDatos();
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminar = async (id) => {
    setErrorMsg('');
    setExitoMsg('');
    try {
      setCargando(true);
      await eliminarPlatoApi(id);
      await sincronizarDatos();
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setCargando(false);
    }
  };

  const manejarConfirmar = async () => {
    setErrorMsg('');
    setExitoMsg('');
    try {
      setCargando(true);
      const data = await confirmarReservaApi();
      setExitoMsg(data.mensaje);
      setSegundos(120);
      await sincronizarDatos();
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setCargando(false);
    }
  };

  const min = String(Math.floor(segundos / 60)).padStart(2, '0');
  const seg = String(segundos % 60).padStart(2, '0');

  return (
    <div>
      {errorMsg && (
        <UncontrolledAlert color="warning" className="fw-semibold shadow-sm">
          {errorMsg}
        </UncontrolledAlert>
      )}

      {exitoMsg && (
        <Alert color="success" className="fw-semibold shadow-sm">
          {exitoMsg}
        </Alert>
      )}

      {/* Panel Superior */}
      <Alert
        color="info"
        className="panel-superior d-flex flex-wrap justify-content-between align-items-center shadow-sm mb-4"
      >
        <span className="fw-bold fs-5">
          Tu saldo actual: ${Number(reserva.saldo).toFixed(2)}
        </span>

        <div className="d-flex flex-wrap align-items-center gap-2">
          {cargando && <span className="fw-bold text-primary me-2">Cargando...</span>}

          <Badge color={segundos <= 20 ? 'danger' : 'primary'} className="p-2 fs-6">
            Tiempo: {min}:{seg}
          </Badge>

          <Badge color="dark" pill className="p-2 fs-6">
            Total de tu Reserva: ${Number(reserva.total).toFixed(2)}
          </Badge>

          <Button
            color="dark"
            outline
            size="sm"
            disabled={cargando}
            onClick={manejarNuevaReserva}
          >
            Nueva Reserva ($25.00)
          </Button>

          <Button
            color="secondary"
            outline
            size="sm"
            disabled={cargando}
            onClick={manejarRestaurarCocina}
          >
            Restaurar Stock Cocina
          </Button>
        </div>
      </Alert>

      <Row>
        {/* El Menú del Día */}
        <Col xs="12" lg="8">
          <h5 className="fw-bold mb-3">El Menú del Día</h5>
          <Row>
            {menu.map((plato) => (
              <Col xs="12" md="4" key={plato.id}>
                <Card className="mb-3 shadow-sm">
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <CardSubtitle className="text-muted small fw-bold">
                        {plato.categoria}
                      </CardSubtitle>
                      <Badge color="success">${Number(plato.precio).toFixed(2)}</Badge>
                    </div>

                    <CardTitle tag="h6" className="fw-bold">
                      {plato.nombre}
                    </CardTitle>

                    <CardText className="mb-3">
                      Stock: <strong>{plato.stock}</strong>
                    </CardText>

                    {plato.stock === 0 ? (
                      <Button color="secondary" disabled className="w-100">
                        Agotado
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        className="w-100"
                        disabled={cargando}
                        onClick={() => manejarAgregar(plato.id)}
                      >
                        Añadir a la Reserva
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Tu Bandeja de Reserva */}
        <Col xs="12" lg="4">
          <h5 className="fw-bold mb-3">Tu Bandeja de Reserva</h5>
          <Card className="shadow-sm">
            <CardBody>
              {reserva.itemsReservados.length === 0 ? (
                <p className="text-muted mb-0">No hay platillos seleccionados.</p>
              ) : (
                <>
                  <ListGroup className="mb-3">
                    {reserva.itemsReservados.map((item) => {
                      const infoPlato = menu.find((p) => p.id === item.id);
                      const nombrePlato = infoPlato ? infoPlato.nombre : `Plato #${item.id}`;

                      return (
                        <ListGroupItem
                          key={item.id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <div className="fw-bold">{nombrePlato}</div>
                            <small className="text-muted">Cantidad: {item.cantidad}</small>
                          </div>

                          <div className="d-flex align-items-center gap-2">
                            <ButtonGroup size="sm">
                              <Button
                                color="secondary"
                                outline
                                disabled={cargando}
                                onClick={() => manejarPorciones(item.id, item.cantidad - 1)}
                              >
                                -
                              </Button>
                              <Button
                                color="secondary"
                                outline
                                disabled={cargando}
                                onClick={() => manejarPorciones(item.id, item.cantidad + 1)}
                              >
                                +
                              </Button>
                            </ButtonGroup>

                            <Button
                              color="danger"
                              outline
                              size="sm"
                              disabled={cargando}
                              onClick={() => manejarEliminar(item.id)}
                            >
                              Quitar
                            </Button>
                          </div>
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>

                  <Button
                    color="success"
                    className="w-100 fw-bold"
                    disabled={cargando}
                    onClick={manejarConfirmar}
                  >
                    Confirmar Reserva
                  </Button>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}