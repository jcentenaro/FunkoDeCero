const {Router} = require("express");
// no hago lo mismo que en app.js sino estaría replicando el server, aca solicito un módulo nativa de express para manejar estas rutas
const router = Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { body } = require("express-validator");

const validations = [
    body("nombre")
        .not()
        .isEmpty()
        .withMessage("El nombre es obligatorio")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Debe tener como mínimo 3 caracteres"),
    body("precio")
        .not()
        .isEmpty()
        .withMessage("El precio es obligatorio"),
];

const controller = require("../controllers/shopController");
//cambio app por router que es lo que maneja las rutas
router.get("/", controller.shopView);
router.get("/starwars", controller.shopViewSw);
router.get("/pokemon", controller.shopViewPM);
router.get("/harrypotter", controller.shopViewHP);
router.get("/marvel", controller.shopViewMV);
router.get("/dieverruckt", controller.shopViewDV);
router.get("/item/:id", controller.idView);
router.post("/item/:id/add", controller.itemView);
router.get("/cart", controller.cartView);
router.post("/cart", controller.checkoutView);


//Ahora hago publico lo que cargo arriba
module.exports = router;