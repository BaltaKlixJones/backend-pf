const { Router } = require("express");
const {
  getServiceHandler,
  getByIdServiceHandler,
  deleteServiceHandler,
  postServiceHandler,
  putServiceHandler,
} = require("../Handler/ServiceHandler");
const serviceRouter = Router();

serviceRouter.get("/", getServiceHandler);
serviceRouter.get("/:id", getByIdServiceHandler);
serviceRouter.delete("/:id", deleteServiceHandler);
serviceRouter.post("/", postServiceHandler);
serviceRouter.put("/:id", putServiceHandler);

module.exports = serviceRouter;
