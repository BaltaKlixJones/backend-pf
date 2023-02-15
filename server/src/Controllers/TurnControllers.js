const { Turn, Professional, Client, Service } = require("../db.js");


const tableIncludedMap = async (tables) => {
  const result = await tables.map((table) => {
    return {
      id: table.id,
      date: table.date,
      hour: table.hour,
      status: table.status,
      Professionals: table.Professionals[0],
      Client: table.Clients[0],
      Service: table.Services[0]
    };
  });
  return result;
};


const getAllTurns = async () => {
  const results = await Turn.findAll({
    include: [
      {
        model: Professional,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
      {
        model: Client,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
      {
        model: Service,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const resultsClean = await tableIncludedMap(results)
  return resultsClean
};

const findById = async (id) => {
  const turnID = await Turn.findByPk(id);

  return turnID;
};

const createdTurn = async (date, hour, idProfessional, idClient, idService) => {
  const turnExist = await Turn.findOne({ where: { date, hour } });
  if (turnExist) {
    throw new Error(`Turn isn´t available`);
  }
  const turnCreated = await Turn.create({
    date,
    hour,
  });

  const professionalDB = await Professional.findAll({
    where: { id: idProfessional },
  });
  const clientDB = await Client.findAll({
    where: { id: idClient },
  });
  const serviceDB = await Service.findAll({
    where: { id: idService },
  });
  
  turnCreated.addProfessional(professionalDB);
  turnCreated.addClient(clientDB);
  turnCreated.addService(serviceDB);

  
  return "Turn created successfully!";
};

const deleteTurn = async (id) => {
  const turn = await Turn.findByPk(id);

  return turn;
};

module.exports = {
  getAllTurns,
  findById,
  createdTurn,
  deleteTurn,
};
