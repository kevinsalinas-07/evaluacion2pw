# Evaluación II - Programación Web (Ciclo 02, 2026)

Solución Full-Stack desarrollada con **Node.js, Express (en memoria)** para el Backend y **React (Vite + Bootstrap + Reactstrap)** para el Frontend, estructurada bajo un patrón monorepo.

---

##  Arquitectura del Proyecto

```text
proyecto-evaluacion-2/
├── client/                         # Frontend (React + Vite + Reactstrap)
│   ├── src/
│   │   ├── api/                    # Servicios fetch centralizados (async/await)
│   │   ├── pages/                  # Vistas de la aplicación (HomePage, JuegoPage, FoodDeiPage)
│   │   ├── AppRoot.jsx             # Barra de navegación principal
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── src/                            # Backend (Node.js + Express en memoria)
│   ├── controllers/                # Lógica de negocio (juegoController y reservaController)
│   ├── routes/                     # Definición de rutas (juegoRoutes y reservaRoutes)
│   └── index.js                    # Punto de entrada de Express
├── .gitignore
├── package.json
└── README.md
Guía de Instalación y Ejecución Local:
Para clonar y poner a funcionar el proyecto en tu computadora, sigue estos pasos:

1. Clonar el repositorio
Bash
git clone <https://github.com/kevinsalinas-07/evaluacion2pw.git>
cd evaluacion2pw/
2. Configurar y Ejecutar el Backend (Express)
Instala las dependencias del servidor en la raíz del proyecto:

Bash
npm install
Inicia el servidor de desarrollo (corre en el puerto 3000):

Bash
npm run dev
3. Configurar y Ejecutar el Frontend (React + Vite)
Abre una segunda terminal, entra a la carpeta client/ e instala las dependencias:

Bash
cd client
npm install
Inicia el servidor del cliente (corre en el puerto 5173):

Bash
npm run dev
Abre tu navegador e ingresa a: http://localhost:5173

 Descripción de los Módulos
1. Ejercicio 1: "Adivina el Número"
Backend: Genera un número aleatorio en memoria entre 1 y 100. Expone los endpoints POST /guess (para evaluar si el intento es mayor, menor o correcto) y POST /reset (para reiniciar la partida).

Frontend (JuegoPage.jsx): Formulario numérico con control de estado mediante useState, visualización de mensajes y un listado dinámico con el historial de intentos realizados.

2. Ejercicio 2: Caso de Negocio "Food DEI S.A. de R.L."
Backend: Administra un catálogo de platillos (menu) y el estado del usuario (reserva con saldo inicial de $25.00) estrictamente en memoria RAM. Valida stock y saldo, respondiendo con código 400 Bad Request ante incumplimientos de reglas de negocio.

Frontend (FoodDeiPage.jsx):

Panel Superior: Muestra el saldo actual, un temporizador de cuenta regresiva de 2 minutos y el total acumulado de la reserva con componentes de Reactstrap.

Catálogo: Cuadrícula de platillos con control visual de stock y botón dinámico ("Añadir" o "Agotado").

Bandeja Lateral: Carrito de compras con controles compactos (- y +) para porciones y botón de eliminación, respaldado por un temporizador que expira y reinicia los datos automáticamente al llegar a 00:00.