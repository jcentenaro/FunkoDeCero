// para controlar imágenes estos 3
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { validationResult } = require("express-validator");

const { Op } = require('sequelize');

const model = require("../models/products");
const modelCategory = require("../models/category");
const modelLicence = require("../models/licence");
const modelType = require("../models/type");

const index = async (req, res) => {
  try {
    let whereCondition = {}; // Inicializamos el objeto de condición

    // Verificamos si se proporcionó un término de búsqueda
    if (req.query.buscar) {
      // Agregamos condiciones para buscar por nombre, categoría o id
      whereCondition[Op.or] = [
        { nombre: { [Op.like]: `%${req.query.buscar}%` } },
        { id: req.query.buscar } // Suponiendo que 'buscar' puede ser un id numérico
      ];
    }
    if (req.query.categoryId) {
      whereCondition.categoryId = req.query.categoryId;
    }

    // Paginación
    const page = parseInt(req.query.page) || 1; // Página actual
    const pageSize = 10; // Tamaño de la página
    const offset = (page - 1) * pageSize; // Desplazamiento

    // Realizamos la consulta a la base de datos utilizando la condición de búsqueda y la paginación
    const productos = await model.findAll({
      where: whereCondition, // Aplicamos la condición de búsqueda
      include: [
        {
          model: modelCategory,
          attributes: ["nombre"],
        },
        {
          model: modelLicence,
          attributes: ["nombre"],
        },
        {
          model: modelType,
          attributes: ["nombre"],
        },
      ],
      limit: pageSize, // Limitamos el número de resultados por página
      offset: offset, // Aplicamos el desplazamiento
    });

    // Contamos el número total de productos (sin límite)
    const totalProducts = await model.count({ where: whereCondition });
    const totalPages = Math.ceil(totalProducts / pageSize); // Calculamos el número total de páginas

    res.render("admin/productos/index", { productos, totalPages, currentPage: page });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};



const createView = async (req, res) => {
  try {
    const categorias = await modelCategory.findAll();
    const licencias = await modelLicence.findAll();
    const tipos = await modelType.findAll();
    res.render("admin/productos/create", { categorias, licencias, tipos });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
  
};

const store = async (req, res) => {
  console.log(req.body, req.file);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      const categorias = await modelCategory.findAll();
      const licencias = await modelLicence.findAll();
      const tipos = await modelType.findAll();
      return res.render("admin/productos/create", {
        categorias,
        licencias,
        tipos,
        values: { ...req.params, ...req.body },
        errors: errors.array(),
      });
    } catch (error) {
      console.log("Error al buscar categorías, licencias o tipos:", error);
      res.status(500).send(error);
    }
  }

  try {
    const producto = await model.create({
      ...req.body, // Copia todos los campos del cuerpo de la solicitud
      typeId: req.body.tipoId // Asigna el typeId del producto
    });
    // console.log(producto);

    if (producto && req.file) {
      sharp(req.file.buffer)
        .resize({
          width: 600,
          height: 600,
          fit: sharp.fit.cover,
          position: sharp.strategy.entropy,
        })
        .toFile(
          path.resolve(
            __dirname,
            `../../public/uploads/producto_${producto.id}.webp`
          )
        );
    }
    res.redirect("/admin/productos");
  } catch (error) {
    console.log("Error al crear el producto:", error);
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  console.log(req.params, req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    try {
      const categorias = await modelCategory.findAll();
      const licencias = await modelLicence.findAll();
      const tipos = await modelType.findAll();
      return res.render("admin/productos/edit", {
        categorias,
        licencias,
        tipos,
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
            width: 600,
            height: 600,
            fit: sharp.fit.cover,
            position: sharp.strategy.entropy,
          })
          .toFile(
            path.resolve(
              __dirname,
              `../../public/uploads/producto_${req.params.id}.webp`
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
          `../../public/uploads/producto_${req.params.id}.webp`
        )
      )
    ) {
      fs.unlink(
        path.resolve(
          __dirname,
          `../../public/uploads/producto_${req.params.id}.webp`
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
    const producto = await model.findByPk(req.params.id, {
      include: [modelType] // Incluye la relación con el tipo
    });

    if (producto) {
      const categorias = await modelCategory.findAll();
      const licencias = await modelLicence.findAll();
      const tipos = await modelType.findAll();
      res.render("admin/productos/edit", { values: producto, categorias, licencias, tipos });
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
