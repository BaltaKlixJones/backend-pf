const { Router } = require("express");
const {
  getProfessionalHandler,
  getByNameProfessionalHandler,
  getIDProfessionalHandler,
  deleteProfessionalHandler,
  postProfessionalHandler,
  putProfessionalHandler,
} = require("../Handler/ProfessionalHandler");
const professionalRouter = Router();

professionalRouter.get("/", getProfessionalHandler);
professionalRouter.get("/", getByNameProfessionalHandler);
professionalRouter.get("/:id", getIDProfessionalHandler);
professionalRouter.delete("/", deleteProfessionalHandler);
professionalRouter.post("/", postProfessionalHandler);
professionalRouter.put("/", putProfessionalHandler);

module.exports = professionalRouter;
