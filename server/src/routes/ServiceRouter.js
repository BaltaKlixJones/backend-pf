const { Router } = require("express");
const {
  getServiceHandler,
  getByNameServiceHandler,
  deleteServiceHandler,
  postServiceHandler,
  putServiceHandler,
} = require("../Handler/ServiceHandler");
const serviceRouter = Router();

serviceRouter.get("/", getServiceHandler);
serviceRouter.get("/", getByNameServiceHandler);
serviceRouter.delete("/", deleteServiceHandler);
serviceRouter.post("/", postServiceHandler);
serviceRouter.put("/", putServiceHandler);

module.exports = serviceRouter;
