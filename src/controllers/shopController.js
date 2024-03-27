const data = require("../services/service_product");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { validationResult } = require("express-validator");

const { Op } = require('sequelize');

const model = require("../models/products");
const category = require("../models/category");
const licence = require("../models/licence");

const shopView = async (req, res) => {  
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 6;
    const offset = (page - 1) * pageSize;

    let whereCondition = {};

    // Verificar si se proporcionó un término de búsqueda
    if (req.query.buscar) {
      // Agregar condición para buscar por nombre del producto o licenceId de forma parcial
      whereCondition[Op.or] = [
        { nombre: { [Op.like]: `%${req.query.buscar}%` } },
        { licenceId: { [Op.like]: `%${req.query.buscar}%` } }
      ];
    }

    // Verificar si se proporcionó un parámetro de categoría
    if (req.query.categoryId) {
      whereCondition.categoryId = req.query.categoryId;
    }

    const orderBy = req.query.orderBy || 'price-ascending';
    let orderColumn;
    let orderDirection;

    switch (orderBy) {
      case 'price-ascending':
        orderColumn = 'precio';
        orderDirection = 'ASC';
        break;
      case 'price-descending':
        orderColumn = 'precio';
        orderDirection = 'DESC';
        break;
      case 'alpha-ascending':
        orderColumn = 'nombre';
        orderDirection = 'ASC';
        break;
      case 'alpha-descending':
        orderColumn = 'nombre';
        orderDirection = 'DESC';
        break;
      default:
        orderColumn = 'nombre';
        orderDirection = 'ASC';
    }

    const products = await model.findAll({
      include: [
        {
          model: category,
          attributes: ["nombre"],
        },
        {
          model: licence,
          attributes: ["nombre"],
        },
      ],
      where: whereCondition,
      limit: pageSize,
      offset: offset,
      order: [[orderColumn, orderDirection]],
    });

    const totalProducts = await model.count({ where: whereCondition }); // Contar solo los productos que coinciden con la condición
    const totalPages = Math.ceil(totalProducts / pageSize);
    const categories = await category.findAll();

    res.render("shop/shop", { products, currentPage: page, totalPages, categories });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};




const shopViewSw = async (req, res) => {
  try {
    const products = await model.findAll({
      where: {
        licenceId: "1",
      },
      include: [
        {
          model: category,
          attributes: ["nombre"],
        },
        {
          model: licence,
          attributes: ["nombre"],
        },
      ],
    });
    // console.log(productos);
    res.render("shop/starwars", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const shopViewPM = async (req, res) => {
  try {
    const products = await model.findAll({
      where: {
        licenceId: "3",
      },
      include: [
        {
          model: category,
          attributes: ["nombre"],
        },
        {
          model: licence,
          attributes: ["nombre"],
        },
      ],
    });
    // console.log(productos);
    res.render("shop/pokemon", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const shopViewMV = async (req, res) => {
  try {
    const products = await model.findAll({
      where: {
        licenceId: "2",
      },
      include: [
        {
          model: category,
          attributes: ["nombre"],
        },
        {
          model: licence,
          attributes: ["nombre"],
        },
      ],
    });
    // console.log(productos);
    res.render("shop/pokemon", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const shopViewHP = async (req, res) => {
  try {
    const products = await model.findAll({
      where: {
        licenceId: "4",
      },
      include: [
        {
          model: category,
          attributes: ["nombre"],
        },
        {
          model: licence,
          attributes: ["nombre"],
        },
      ],
    });
    // console.log(productos);
    res.render("shop/harrypotter", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const idView = async (req, res) => {
  try {
    const product = await model.findByPk(req.params.id, {
      include: [
        {
          model: category,
          attributes: ["nombre"],
        },
        {
          model: licence,
          attributes: ["nombre"],
        },
      ],
    });

    // console.log(productos);
    if (product) {
      res.render("shop/item", { values: product });
    } else {
      res.status(404).send("El producto no existe");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const itemView = (req, res) => {
  res.send("Shop ITEM ID ADD");
};

const cartView = (req, res) => {
  res.render("shop/cart");
};

const checkoutView = (req, res) => {
  res.send("Cart POST");
};

module.exports = {
  shopView,
  shopViewSw,
  shopViewPM,
  shopViewHP,
  shopViewMV,
  idView,
  itemView,
  cartView,
  checkoutView,
};
