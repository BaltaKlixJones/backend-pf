const { Router } = require("express");
const {
  deleteClientHandler,
  postClientHandler,
  putClientHandler,
} = require("../Handler/ClientHandler");
const clientRouter = Router();

clientRouter.delete("/", deleteClientHandler);
clientRouter.post("/", postClientHandler);
clientRouter.put("/", putClientHandler);

module.exports = clientRouter;