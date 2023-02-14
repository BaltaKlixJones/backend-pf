const {
  postClient,
  getAllClients,
  getClientByName,
  getClientById,
  deleteCLient,
} = require("../Controllers/ClientControllers");

const getAllClientHandler = async (req, res) => {
  // Get all clients
  const { name } = req.query;

  try {
    const results = name ? await getClientByName(name) : await getAllClients();

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.masage });
  }
};

const deleteClientHandler = async (req, res) => {
  // Delete client by id
  const { id } = req.params;
  console.log("HOLAA");
  try {
    const clientDelete = await deleteCLient(id);
    !clientDelete
      ? res.status(400).json({ error: "Client not found" })
      : clientDelete.destroy();
    res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postClientHandler = async (req, res) => {
  try {
    const { name, email, dni } = req.body;

    if (!name || !email || !dni) {
      return res.status(400).json({ error: "Missing Data" });
    }
    const clientCreate = await postClient(name, email, dni);
    clientCreate
      ? res.status(200).json({ message: "Client created" })
      : res.status(400).json({ error: "Client not created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getClientID = async (req, res) => {
  const { id } = req.params;
  try {
    const clientID = await getClientById(id);
    res.status(200).json(clientID);
  } catch (error) {
    res.status(400).json({ error: error.mesage });
  }
};

const putClientHandler = () => {
  // me parece que no sirve este metodo
};

module.exports = {
  deleteClientHandler,
  postClientHandler,
  putClientHandler,
  getAllClientHandler,
  getClientID,
};
