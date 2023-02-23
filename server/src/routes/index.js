const { Router } = require("express");
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const turnRouter = require("./TurnRouter.js");
const serviceRouter = require("./ServiceRouter.js");
const professionalRouter = require("./ProfessionalRouter.js");
const clientRouter = require("./ClientRouter.js");
const paymentRouter = require("./PaymentRouter.js");

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);

router.use("/turn", turnRouter);
router.use("/service", serviceRouter);
router.use("/professional", professionalRouter);
router.use("/client", clientRouter);
router.use("/payment", paymentRouter);

module.exports = router;
