const { Router } = require("express");
const router = Router();
// traigo el modelo de usuarios de models
const model = require("../models/users");

const { body } = require("express-validator");

const registerValidations = [
  body("email")
    .isEmail()
    .withMessage("Ingrese una dirección de correo electrónico válida")
    .bail()
    .custom((value, { req }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await model.findOne({
            where: {
              email: value,
            },
          });

          if (user) {
            console.log(user);
            return reject();
          } else {
            return resolve();
          }
        } catch (error) {
          console.log(error);
        }
      });
    })
    .withMessage("Dirección de correo electrónico duplicada"),
  body("password")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    })
    .withMessage("La contraseña debe tener un número, una mayúscula, una minúscula y un caractetr especial.")
    .bail()
    .custom((value, { req }) => value === req.body.password_confirmation)
    .withMessage("Las contraseñas no coinciden"),
];

const loginValidations = [
  body("email")
    .isEmail()
    .withMessage("Ingrese una dirección de correo electrónico válida"),
  // body("password")
  //   .isStrongPassword({
  //     minLength: 6,
  //     minLowercase: 1,
  //     minUppercase: 1,
  //     minSymbols: 1,
  //     minNumbers: 1,
  //   })
  //   .withMessage("La contraseña debe tener ..."),
];

const controller = require("../controllers/authController");

router.get("/register", controller.register);
router.post("/register", registerValidations, controller.postRegister);

router.get("/login", controller.login);
router.post("/login", loginValidations, controller.postLogin);

router.get("/logout", controller.logout);

//Ahora hago publico lo que cargo arriba
module.exports = router;
