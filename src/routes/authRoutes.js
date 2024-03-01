const express = require("express");
// no hago lo mismo que en app.js sino estaría replicando el server, aca solicito un moodulo nativa de express para manejar estas rutas
const router = express.Router();
//cambio app por router que es lo que maneja las rutas
router.get("/", (req, res) => {
  res.send("Login HOME");
});
router.post("/login", (req, res) => {
  res.send("Login POST");
});
router.get("/register", (req, res) => {
  res.send("Register GET");
});
router.post("/register", (req, res) => {
  res.send("Register POST");
});
router.get("/logout", (req, res) => {
  res.send("LOGOUT");
});

//Ahora hago publico lo que cargo arriba
module.exports = router;
