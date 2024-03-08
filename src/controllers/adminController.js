// para controlar imágenes estos 3
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { validationResult } = require("express-validator");

const model = require("../models/products");
const modelCategory = require("../models/category");

const index = async (req, res) => {
  try {
    const productos = await model.findAll();
    // console.log(productos);
    res.render("admin/productos/index", { productos });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const createView = async (req, res) => {
  try {
    const categorias = await modelCategory.findAll();
    res.render("admin/productos/create", { categorias });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
  
};

const store = async (req, res) => {
  // console.log(req.body, req.file);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      const categorias = await modelCategory.findAll();
      return res.render("admin/productos/create", {
        categorias,
        values: req.body,
        errors: errors.array(),
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  try {
    const producto = await model.create(req.body);
    // console.log(producto);

    if (producto && req.file) {
      sharp(req.file.buffer)
        .resize({
          width: 300,
          height: 300,
          fit: sharp.fit.cover,
          position: sharp.strategy.entropy,
        })
        .toFile(
          path.resolve(
            __dirname,
            `../../public/uploads/producto_${producto.id}.jpg`
          )
        );
    }
    res.redirect("/admin/productos");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  console.log(req.params, req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      const categorias = await modelCategory.findAll();
      return res.render("admin/productos/edit", {
        categorias,
        values: { ...req.params, ...req.body },
        error: errors.array(),
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  try {
    const affected = await model.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (affected[0] == 1) {
      if (req.file) {
        sharp(req.file.buffer)
          .resize({
            width: 300,
            height: 300,
            fit: sharp.fit.cover,
            position: sharp.strategy.entropy,
          })
          .toFile(
            path.resolve(
              __dirname,
              `../../public/uploads/producto_${req.params.id}.jpg`
            )
          );
      }

      res.redirect("/admin/productos");
    } else {
      res.status(500).send("Error al actualizar");
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

    if (result == 1) {
      if(fs.existsSync(
        path.resolve(
          __dirname,
          `../../public/uploads/producto_${req.params.id}.jpg`
        )
      )
    ) {
      fs.unlink(
        path.resolve(
          __dirname,
          `../../public/uploads/producto_${req.params.id}.jpg`
        ),
        (error) => {
          if (error) {
            console.log(error);
          }
        }
        );
      }
    }
    res.redirect("/admin/productos");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updateView = (req, res) => {
  res.send("ID GET");
};

const editView = async (req, res) => {
  try {
    const producto = await model.findByPk(req.params.id);

    if (producto) {
      const categorias = await modelCategory.findAll();
      res.render("admin/productos/edit", { values: producto, categorias });
    } else {
      res.status(404).send("El producto no existe");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
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
