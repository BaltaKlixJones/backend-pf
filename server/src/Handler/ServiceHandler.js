const {
  postService,
  getServices,
  deleteService,
  putService,
  getByIdService,
} = require("../Controllers/ServiceControllers");

const postServiceHandler = async (req, res) => {
  const { name, price, description, duration, ProfessionalId } = req.body;
  if (!name || !price || !description || !duration || !ProfessionalId) {
    return res.status(400).json({ error: "Missing Data" });
  }
  try {
    const service = await postService(req.body);
    service
      ? res.status(200).json({ message: "service created" })
      : res.status(400).json({ error: "service not created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getServiceHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const service = await getServices(name);
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteServiceHandler = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const delService = await deleteService(id);
    console.log(delService);
    delService <= 0
      ? res.status(400).json({ error: "Service not found" })
      : res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putServiceHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const updateService = await putService(req.body, id);
    console.log(updateService);
    updateService <= 0
      ? res.status(400).json({ error: "Service not found" })
      : res.status(200).json({ message: "Service update succesfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getByIdServiceHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const getIdService = await getByIdService(id);
    res.status(200).json(getIdService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //tuve que trabajarlo desde el get sino nunca llega a esta condicion ya que es el mismo path
};

module.exports = {
  getServiceHandler,
  getByIdServiceHandler,
  deleteServiceHandler,
  postServiceHandler,
  putServiceHandler,
};
