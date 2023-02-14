const { Client } = require("../db.js");
const { Op } = require("sequelize");

const postClient = async (name, email, dni) => {
  const newClient = await Client.create({
    name,
    email,
    dni,
  });
  return newClient;
};

const getAllClients = async () => {
  return await Client.findAll();
};

const getClientByName = async (name) => {
  const dbase = await Pokemon.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });
  return dbase;
};

const getClientById = async (id) => {
  const clientID = await Client.findByPk(id);

  return clientID;
};

const deleteCLient = async (id) => {
  const client = Client.findByPk(id);
  return client;
};

module.exports = {
  postClient,
  getAllClients,
  getClientByName,
  getClientById,
  deleteCLient,
};
