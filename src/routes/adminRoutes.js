const express = require("express");
// no hago lo mismo que en app.js sino estaría replicando el server, aca solicito un módulo nativa de express para manejar estas rutas
const router = express.Router();

const controller = require("../controllers/adminController")
//cambio app por router que es lo que maneja las rutas
router.get("/", controller.index);
router.post("/", controller.store);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy)

// Migro a adminController con reservas
router.get("/create", controller.createView);
router.get("/edit/:id", controller.updateView);
router.put("/edit/:id", controller.editView);
router.delete("/delete/:id", controller.deleteId);

//Ahora hago publico lo que cargo arriba
module.exports = router;