const { Router } = require("express");
const {
  deleteClientHandler,
  postClientHandler,
  putClientHandler,
  getAllClientHandler,
  getClientID,
  getClientname,
} = require("../Handler/ClientHandler");
const clientRouter = Router();

clientRouter.get("/", getAllClientHandler);
clientRouter.delete("/:id", deleteClientHandler);
clientRouter.post("/", postClientHandler);
clientRouter.put("/", putClientHandler);
clientRouter.get("/:id", getClientID);

module.exports = clientRouter;
