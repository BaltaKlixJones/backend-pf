const { Client } = require("../db.js");

const getAllClientHandler = async (req, res) => {
  // Get all clients

  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteClientHandler = async (req, res) => {
  // Delete client by id
  const { id } = req.params;
  console.log("HOLAA");
  try {
    const clientDelete = await Client.findByPk(id);
    !clientDelete
      ? res.status(400).json({ error: "Client not found" })
      : clientDelete.destroy();
    res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postClientHandler = async (req, res) => {
  const { name, email, dni } = req.body;

  if (!name || !email || !dni) {
    return res.status(400).json({ error: "Missing Data" });
  }
  try {
    const clientCreate = await Client.create({
      name,
      email,
      dni,
    });
    clientCreate
      ? res.status(200).json({ message: "Client created" })
      : res.status(400).json({ error: "Client not created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putClientHandler = () => {
 
// me parece que no sirve 
};

module.exports = {
  deleteClientHandler,
  postClientHandler,
  putClientHandler,
  getAllClientHandler,
};
