const express = require("express");
// no hago lo mismo que en app.js sino estaría replicando el server, aca solicito un módulo nativa de express para manejar estas rutas
const router = express.Router();

const controller = require("../controllers/shopController");
//cambio app por router que es lo que maneja las rutas
router.get("/", controller.shopView);
router.get("/item/:id", controller.idView);
router.post("/item/:id/add", controller.itemView);
router.get("/cart", controller.cartView);
router.post("/cart", controller.checkoutView);

//Ahora hago publico lo que cargo arriba
module.exports = router;