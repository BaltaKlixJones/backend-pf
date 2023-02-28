const { Router } = require("express");
const { Professional } = require("../db.js");

const reviewRouter = Router();

reviewRouter.post("/", async (req, res) => {
   const review = req.body;
   const prof = await Professional.findByPk(review.idProf);

   if (!prof) {
      return res.status(404).json({ message: "Professional not found" });
   }

   const obj = {
      score: review.score,
      text: review.text,
   };

   await Professional.update({
      review: [...(prof.review || []), obj] 
   },{
      where: {id: review.idProf}
   }).catch(err => {
      console.error(err);
      res.status(500).send("Error al actualizar el profesional");
   });

   res.status(200).send("Review enviada con éxito");
});

module.exports = reviewRouter;
