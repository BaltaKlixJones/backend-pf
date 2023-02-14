const { Turn } = require("../db.js");

const getAllTurns = async () => {
 return await Turn.findAll()
}

const findById = async (id) => {
    const turnID = await Turn.findByPk(id);

    return turnID;
}

const createdTurn = async (date, hour ) => {
    const turnExist = await Turn.findOne({ where: {date, hour} });
    if(turnExist){
      throw new Error(`Turn isn´t available`)
    }
    const game = await Turn.create({
        date, 
        hour
    })

    return "Successfully reserved turn"
  }

const deleteTurn = async (id) => {
    const turn = await Turn.findByPk(id);

    return turn;
  }
  

module.exports = {
    getAllTurns,
    findById,
    createdTurn,
    deleteTurn
}