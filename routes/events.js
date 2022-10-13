/* Auth
host + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// para validar JWT en todas las rutas
router.use(validarJWT);

router.get(
  "/",

  getEvento
);
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

module.exports = router;
