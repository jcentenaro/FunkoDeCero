const { Router } = require("express");
const router = Router();
// traigo el modulo para validaciones
const { body } = require("express-validator");
// agrgego el modulo para traer las validaciones
const { validationResult } = require("express-validator");
// requiero el modelo para guardar datos en la BD
const model = require("../models/users");

const register = (req, res) => {
  res.render("auth/register");
};
const postRegister = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("auth/register", {
      values: req.body,
      errors: errors.array(),
    });
  }
  try {
    const user = await model.create(req.body);

    console.log(req.body, user);
    res.send("REGISTRADO");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const login = (req, res) => {
  res.render("auth/login");
};
const postLogin = (req, res) => {
  res.send("LOGUEADO");
};
const logout = (req, res) => {
  res.send("LOGOUT");
};

module.exports = {
  register,
  postRegister,
  login,
  postLogin,
  logout,
};
