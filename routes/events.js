const { Router } = require("express");
const {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");

const router = Router();

router.get("/", getEvento);
router.post("/", crearEvento);
router.put("/", actualizarEvento);
router.delete("/", eliminarEvento);

module.exports = router;
