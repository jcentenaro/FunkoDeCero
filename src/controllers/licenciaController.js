const { validationResult } = require("express-validator");

const model = require("../models/licence");

const index = async (req, res) => {
  try {
    const licencias = await model.findAll();
    console.log(licencias);
    res.render("admin/licencias/index", { licencias });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createView = (req, res) => {
  res.render("admin/licencias/create");
};

const store = async (req, res) => {
  // console.log(req.body, req.file);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("admin/licencias/create", {
      values: req.body,
      errors: errors.array(),
    });
  }

  try {
    const licencia = await model.create(req.body);
    // console.log(licencia);

    res.redirect("/admin/licencias");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const editView = async (req, res) => {
  try {
    const licencia = await model.findByPk(req.params.id);

    if (licencia) {
      res.render("admin/licencias/edit", { values: licencia });
    } else {
      res.status(404).send("La licencia no existe");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  console.log(req.params, req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("admin/licencias/edit", {
      values: { ...req.params, ...req.body},
      errors: errors.array(),
    });
  }

  try {
    const affected = await model.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affected[0] == 1) {
      res.redirect("/admin/licencias");
    } else {
      res.status(500).send("Error al actualizar el licencia");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const destroy = async (req, res) => {
  console.log(req.params, req.body);

  try {
    const result = await model.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(result);

    res.redirect("/admin/licencias");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateView = (req, res) => {
  res.send("ID GET");
};

const deleteId = (req, res) => {
  res.send("ID DELETE");
};

module.exports = {
  index,
  store,
  update,
  destroy,
  createView,
  updateView,
  editView,
  deleteId,
};