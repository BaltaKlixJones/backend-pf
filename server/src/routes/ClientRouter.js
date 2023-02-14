const { Router } = require("express");
const {
  deleteClientHandler,
  postClientHandler,
  putClientHandler,
  getAllClientHandler
} = require("../Handler/ClientHandler");
const clientRouter = Router();

clientRouter.get("/", getAllClientHandler);
clientRouter.delete("/:id", deleteClientHandler);
clientRouter.post("/", postClientHandler);
clientRouter.put("/", putClientHandler);

module.exports = clientRouter;