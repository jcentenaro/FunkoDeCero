const {Router} = require("express");
// no hago lo mismo que en app.js sino estaría replicando el server, aca solicito un módulo nativa de express para manejar estas rutas
const router = Router();

const controller = require("../controllers/mainController");
//cambio app por router que es lo que maneja las rutas
router.get("/", controller.index);
router.get("/contacto", controller.contact);
router.get("/faqs", controller.faqs);
router.get("/nosotros", controller.us);

router.get("/productosEdit", (req, res) => {
    res.send("Edit");
});
//Ahora hago publico lo que cargo arriba
module.exports = router;