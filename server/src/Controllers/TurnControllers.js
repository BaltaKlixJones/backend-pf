const { Turn, Professional, Client, Service } = require("../db.js");

// const tableIncludedMap = async (tables) => {
//   const result = await tables.map((table) => {
//     return {
//       id: table.id,
//       date: table.date,
//       hour: table.hour,
//       status: table.status,
//       Professionals: table.Professionals[0],
//       Client: table.Clients[0],
//       Service: table.Services[0]
//     };
//   });
//   return result;
// };

const getAllTurns = async () => {
  const turns = await Turn.findAll();

  const modelsIncluded = await Promise.all(
    turns.map(async (turn) => {
      const professional = await Professional.findByPk(turn.ProfessionalId);
      const service = await Service.findByPk(turn.ServiceId);
      const client = await Client.findByPk(turn.ClientId);
      return {
        id: turn.id,
        date: turn.date,
        hour: turn.hour,
        status: turn.status,
        professionalID: professional.id,
        service,
        client,
      };
    })
  );
  return modelsIncluded;
};

const findById = async (id) => {
  const turnID = await Turn.findByPk(id);

  return turnID;
};

const createdTurn = async ({
  date,
  hour,
  status,
  ProfessionalId,
  ClientId,
  ServiceId,
}) => {
  const turnExist = await Turn.findOne({ where: { date, hour } });
  if (turnExist) {
    throw new Error(`Turn isn´t available`);
  }
  const turnCreated = await Turn.create({
    date,
    hour,
    ProfessionalId,
    ClientId,
    ServiceId,
  });

  return turnCreated;
};

const deleteTurn = async (id) => {
  const turn = await Turn.findByPk(id);

  return turn;
};

const putTurnController = async (id,{status}) => {


  const turnUpdated = await Turn.findByPk(id);
  !turnUpdated ? 
  res.status(400).json({ error: "Turn not found" })
  : turnUpdated.update({status});

  return turnUpdated;
};

/*------------------------------------------------------------ EMAIL ---------------------------------------------------------*/
const nodemailer = require('nodemailer');

const sendEmail = async (receptor, mensaje) => {
  try {
    // Configuración del transportador de correo electrónico
    let transporter = nodemailer.createTransport({
      host : 'smtp.gmail.com',
      port : 465,
      secure : true,
      auth: {
        user: 'flexagenda1@gmail.com',
        pass: 'swch iqnx bqlm iibd'
      }
    });

    // Opciones de correo electrónico
    let mailOptions = {
      from: 'flexagenda1@gmail.com',
      to: receptor,
      subject: "Confirmación de turnos. Flexagenda.",
      text: mensaje,
    };

    // Envío del correo electrónico
    let info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado: ', info.messageId);
  } catch (error) {
    console.log('Error al enviar el correo electrónico: ', error);
  }
};


module.exports = {
  getAllTurns,
  findById,
  createdTurn,
  deleteTurn,
  putTurnController,
  sendEmail,
};
