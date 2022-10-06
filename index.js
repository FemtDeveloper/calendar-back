const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConection } = require("./database/config");

// crear servidor de express
const app = express();

// conexión a db
dbConection();

app.use(cors());

// Directorio público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
