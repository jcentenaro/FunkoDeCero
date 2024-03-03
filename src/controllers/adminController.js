const path = require("path");
const sharp = require("sharp");

const {validationResult } = require("express-validator");

const index = (req, res) => {
    // Prueba con datos estáticos
    const productos = [
        { id: 1, sku: "SKU1111", nombre: "Harry ", licencia: "Harry Potter", categoria: "Toys"},
        { id: 2, sku: "SKU2222", nombre: "Luke", licencia: "Star Wars", categoria: "Remeras"},
        { id: 3, sku: "SKU3333", nombre: "Pokemon", licencia: "Star Wars", categoria: "Libros"},
        { id: 4, sku: "SKU4444", nombre: "Hermonide ", licencia: "Harry Potter", categoria: "Toys"},
        { id: 5, sku: "SKU5555", nombre: "Luke", licencia: "Star Wars", categoria: "Remeras"},
        { id: 6, sku: "SKU6666", nombre: "Pokemon", licencia: "Pokemon", categoria: "Libros"},
        
    ];
    res.render('admin/index', {
        title: "Admin | Productos",
        productos});
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