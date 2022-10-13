const { response } = require("express");
const Evento = require("../models/Evento");

const getEvento = (req, res = response) => {
  return res.json({ ok: true, message: "getEvento" });
};
const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);
  evento.user = req.uid;
  console.log({ evento });

  try {
    const eventoGuardado = await evento.save();
    return res.status(200).json({ ok: true, evento: eventoGuardado });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Comunicarse con el administrador del servidor",
    });
  }
};
const actualizarEvento = (req, res = response) => {
  return res.json({ ok: true, message: "actualizarEvento" });
};
const eliminarEvento = (req, res = response) => {
  return res.json({ ok: true, message: "eliminarEvento" });
};

module.exports = {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
