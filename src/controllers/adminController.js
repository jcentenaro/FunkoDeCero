const path = require("path");
const sharp = require("sharp");

const {validationResult } = require("express-validator");

const model = require("../models/productos");

const index = async (req, res) => {
    try {
      const productos = await model.findAll();
      console.log(productos);
      res.render("admin/index", { productos });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
};

const createView = (req, res) => {
    res.render("admin/create");
};

const store = (req, res) => {
    // console.log(req.body, req.file);

    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("admin/create", {
      values: req.body,
      errors: errors.array(),
    });
  }

    if (req.file) {
    sharp(req.file.buffer)
    .resize({
        width: 300,
        height: 300,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      })
    .toFile(path.resolve(__dirname, "../../public/uploads/image.jpg"));
    }
res.send("CREAR PRODUCTO");
};

const update = (req, res) => {
    console.log(req.params, req.body);
    res.send("Producto Modificado");
};

const destroy = (req, res) => {
    console.log(req.params, req.body);
    res.send("Producto Borrado");
};

const updateView =(req, res) => {
    res.send("ID GET");
};

const editView = (req, res) => {
    res.send("ID PUT");
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
    deleteId
};