const {
  getAllTurns,
  findById,
  createdTurn,
  deleteTurn,
  putTurnController,
  sendEmail
} = require("../Controllers/TurnControllers");

const getTurnHandler = async (req, res) => {
  try {
    const turns = await getAllTurns();
    res.status(200).json(turns);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getIDTurnHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await findById(id);
    if (result.length == 0) throw Error("Turn not found");
    return res.status(200).send(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postTurnHandler = async (req, res) => {
  try {
    const newTurn = await createdTurn(req.body);
    const turnos = await getAllTurns();
    const turno = turnos.find(t => t.id == newTurn.id);
    await sendEmail(`${turno.client.email}`, 
    `Le confirmamos el turno del dia ${newTurn.date} a las ${newTurn.hour}hs para el servicio ${turno.service.name} con el precio de ${turno.service.price} pesos con una duración de ${turno.service.duration}hs, 
    en caso de que necesite cancelar o reprogramar su cita comuniquese con anticipación con el profesional`);
    res.send(newTurn);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};


const deleteTurnHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const turnDelete = await deleteTurn(id);
    !turnDelete
      ? res.status(400).json({ error: "Turn not found" })
      : turnDelete.destroy();
    res.status(200).json({ message: "Turn deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putTurnHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await putTurnController(id, req.body);
    res.status(200).json({ message: "Turn updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTurnHandler,
  getIDTurnHandler,
  deleteTurnHandler,
  postTurnHandler,
  putTurnHandler,
};
