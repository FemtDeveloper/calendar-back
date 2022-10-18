const { response } = require("express");
const Evento = require("../models/Evento");

const getEvento = async (req, res = response) => {
  // .populate trae todos los datos del usuario, sólo necesitamos el name
  const eventos = await Evento.find().populate("user", "name");

  return res.json({ ok: true, eventos });
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
const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res
        .status(404)
        .json({ ok: false, message: "Evento no encontrado con ese ID" });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "No está autorizado para editar este evento",
      });
    }
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: "true" }
    );

    return res.status(200).json({ ok: "true", evento: eventoActualizado });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Comunicarse con el administrador" });
  }

  return res.json({ ok: true, eventoId });
};

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      res
        .status(404)
        .json({ ok: false, message: "Evento no encontrado con ese ID" });
    }
    if (evento.user.toString() !== uid) {
      return res.status(404).json({
        ok: false,
        message: "No está autorizado para elitar este evento",
      });
    }

    const eventoRemovido = await Evento.findByIdAndRemove(eventoId);

    return res.status(200).json({
      ok: "true",
      evento: eventoRemovido,
      msg: "Elemento eliminado exitosamente",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(404)
      .json({ ok: false, msg: "Comunicarse con el administrador" });
  }

  return res.json({ ok: true, eventoId });
};

module.exports = {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
