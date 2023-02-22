const { Professional } = require("../db.js");

const getProfessionalController = async () => {
  const allProfessionals = await Professional.findAll();
  return allProfessionals;
};

const getIDProfessionalController = async (id) => {
  const professionalID = await Professional.findByPk(id);
  return professionalID;
};

const deleteProfessionalController = async (id) => {
  const professionalDelete = await Professional.findByPk(id);
  if (!professionalDelete) {
    return res.status(400).json({ error: "Professional not found" });
  }
  return professionalDelete.destroy();
};

const postProfessionalController = async (
  name,
  email,
  password,
  phone,
  address,
  description,
  category,
  image,
  addressLocation,
  disponibility
) => {
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !address ||
    !description ||
    !category
  ) {
    throw Error("Missing data");
  }
  const professional = await Professional.create({
    name,
    email,
    password,
    phone,
    address,
    description,
    category,
    image,
    addressLocation,
    disponibility,
  });
  return professional;
};

const putProfessionalController = async (
  id,
  { name, email, password, phone, address, description, category, image, addressLocation }
) => {
  const professionalUpdate = await Professional.findByPk(id);
  !professionalUpdate
    ? res.status(400).json({ error: "Professional not found" })
    : professionalUpdate.update({
        name,
        email,
        password,
        phone,
        address,
        image,
        description,
        category,
        addressLocation
      });
  return professionalUpdate;
};

module.exports = {
  getProfessionalController,
  getIDProfessionalController,
  deleteProfessionalController,
  postProfessionalController,
  putProfessionalController,
};
