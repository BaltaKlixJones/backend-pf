
const { Client } = require("../db.js");
const { Op } = require("sequelize");

const postClient = async (name, email, password) => {
  const newClient = await Client.create({
    name,
    email,
    password,
  });
  return newClient;
};

const getAllClients = async () => {
  return await Client.findAll();
};

const getClientByName = async (name) => {
  const lower = name.toLowerCase();

  const dbase = await Client.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });

  const api = await getAllClients();

  filteredApi = api.filter((client) => client.name == lower);

  if (filteredApi.length === 0 && dbase.length === 0) {
    return "No se Encontro el client";
  }

  return [...dbase, ...filteredApi];
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

