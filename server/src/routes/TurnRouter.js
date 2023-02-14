const { Router } = require("express");
const {
  getTurnHandler,
  getIDTurnHandler,
  deleteTurnHandler,
  postTurnHandler,
  putTurnHandler,
} = require("../Handler/TurnHandler");
const turnRouter = Router();

turnRouter.get("/", getTurnHandler);
turnRouter.get("/:id", getIDTurnHandler);
turnRouter.delete("/", deleteTurnHandler);
turnRouter.post("/", postTurnHandler);
turnRouter.put("/", putTurnHandler);

module.exports = turnRouter;
