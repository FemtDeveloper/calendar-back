const { response } = require("express");

const getEvento = (req, res = response) => {
  return res.json({ ok: true, message: "getEvento" });
};
const crearEvento = (req, res = response) => {
  return res.json({ ok: true, message: "crearEvento" });
};
const actualizarEvento = (req, res = response) => {
  return res.json({ ok: true, message: "actualizarEvento" });
};
const eliminarEvento = (req, res = response) => {
  return res.json({ ok: true, message: "getEvento" });
};

module.exports = {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
