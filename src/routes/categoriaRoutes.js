const { Router } = require("express");
// no hago lo mismo que en app.js sino estaría replicando el server, aca solicito un módulo nativa de express para manejar estas rutas
const router = Router();

const { body } = require("express-validator");

const validations = [
  body("nombre")
    .not()
    .isEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Debe tener como mínimo 3 caracteres"),
];

const controller = require("../controllers/categoriaController");
//cambio app por router que es lo que maneja las rutas
router.get("/", controller.index);
// Primero multer, después validador
router.post("/", validations, controller.store);
router.put("/:id", validations, controller.update);
router.delete("/:id", controller.destroy);
router.get("/:id/edit", controller.editView);

// Migro a adminController con reservas
router.get("/create", controller.createView);
router.get("/edit/:id", controller.updateView);
router.put("/edit/:id", controller.editView);
router.delete("/delete/:id", controller.deleteId);

//Ahora hago publico lo que cargo arriba
module.exports = router;
