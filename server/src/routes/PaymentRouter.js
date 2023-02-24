const { Router } = require("express");
const mercadopago = require("mercadopago");
require("dotenv").config();

const paymentRouter = Router();

mercadopago.configure({
  access_token:
    "TEST-4120646656497606-022219-d8b0ae8d691ccb656719bbe1a741de4f-570372996",
});

paymentRouter.post("/", (req, res) => {
  const turn = req.body;
  let preference = {
    items: [
      {
        id: turn.turnId,
        title: turn.title,
        currency_id: "ARS",
        quantity: turn.quantity,
        unit_price: turn.price,
      },
    ],
    back_urls: {
      success: "http://localhost:3000/paymentApproved",
      failure: "http://localhost:3000/paymentFailure",
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true,
  };
  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).json({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
});

module.exports = paymentRouter;
