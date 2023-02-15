const { Professional } = require("../db.js");
const {
  getProfessionalController,
  getIDProfessionalController,
  deleteProfessionalController,
  postProfessionalController,
  putProfessionalController,
} = require("../Controllers/ProfessionalControllers.js");

const getProfessionalHandler = async (req, res) => {
  try {
    const professional = await getProfessionalController();
    professional.length === 0
      ? res.status(400).send("No hay profesionales registrados")
      : res.status(200).json(professional);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getIDProfessionalHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const professional = await getIDProfessionalController(id);
    res.status(200).json(professional);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProfessionalHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProfessionalController(id);
    res.status(200).json({ message: "Professional deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postProfessionalHandler = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    description,
    image,
    category,
    disponibility,
  } = req.body;

  try {
    const newProfessional = await postProfessionalController(
      name,
      email,
      password,
      phone,
      address,
      description,
      image,
      category,
      disponibility
    );
    !newProfessional
      ? res.status(400).json({ error: "Professional not created" })
      : res.status(200).json({ message: "Professional created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putProfessionalHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await putProfessionalController(id, req.body);
    return res.status(200).json({ message: "Professional updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProfessionalHandler,
  getIDProfessionalHandler,
  deleteProfessionalHandler,
  postProfessionalHandler,
  putProfessionalHandler,
};
