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
    const pageSize = 9;
    const offset = (page - 1) * pageSize;

    let whereCondition = {};

    if (req.query.buscar) {
      whereCondition[Op.or] = [
        { nombre: { [Op.like]: `%${req.query.buscar}%` } },
        { '$licence.nombre$': { [Op.like]: `%${req.query.buscar}%` } } // Condición para buscar por nombre de licencia
      ];
    }

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

    // Consulta para los productos del slider
    const sliderProducts = await model.findAll({
      where: {
        typeId: 1, // Aquí especifica el ID específico que deseas filtrar
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

    // Consulta para los productos de la página principal
    const { count, rows: products } = await model.findAndCountAll({
      where: whereCondition,
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
      limit: pageSize,
      offset: offset,
      order: [[orderColumn, orderDirection]],
    });

    const totalPages = Math.ceil(count / pageSize);
    const categories = await category.findAll();

    // Renderizar la página principal y pasar los productos del slider como una variable aparte
    res.render("shop/shop", { products, sliderProducts, currentPage: page, totalPages, categories });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


const shopViewSw = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 9;
    const offset = (page - 1) * pageSize;

    let whereCondition = {};

    if (req.query.buscar) {
      whereCondition[Op.or] = [
        { nombre: { [Op.like]: `%${req.query.buscar}%` } },
        { licenceId: { [Op.like]: `%${req.query.buscar}%` } }
      ];
    }

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

    // Consulta para los productos del slider
    const sliderProducts = await model.findAll({
      where: {
        typeId: 1, // Aquí especifica el ID específico que deseas filtrar
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

    // Consulta para los productos de la página principal
    const { count, rows: products } = await model.findAndCountAll({
      where: {
        licenceId: "1", // Establecer la condición de licenceId aquí
        ...whereCondition, // Mantener las demás condiciones de búsqueda
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
      limit: pageSize,
      offset: offset,
      order: [[orderColumn, orderDirection]],
    });

    const totalPages = Math.ceil(count / pageSize);
    const categories = await category.findAll();

    // Renderizar la página principal y pasar los productos del slider como una variable aparte
    res.render("shop/starwars", { products, sliderProducts, currentPage: page, totalPages, categories });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


const shopViewPM = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 9;
    const offset = (page - 1) * pageSize;

    let whereCondition = {};

    if (req.query.buscar) {
      whereCondition[Op.or] = [
        { nombre: { [Op.like]: `%${req.query.buscar}%` } },
        { licenceId: { [Op.like]: `%${req.query.buscar}%` } }
      ];
    }

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

    // Consulta para los productos del slider
    const sliderProducts = await model.findAll({
      where: {
        typeId: 1, // Aquí especifica el ID específico que deseas filtrar
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

    // Consulta para los productos de la página principal
    const { count, rows: products } = await model.findAndCountAll({
      where: {
        licenceId: "3", // Establecer la condición de licenceId aquí
        ...whereCondition, // Mantener las demás condiciones de búsqueda
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
      limit: pageSize,
      offset: offset,
      order: [[orderColumn, orderDirection]],
    });

    const totalPages = Math.ceil(count / pageSize);
    const categories = await category.findAll();

    // Renderizar la página principal y pasar los productos del slider como una variable aparte
    res.render("shop/pokemon", { products, sliderProducts, currentPage: page, totalPages, categories });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


const shopViewMV = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 9;
    const offset = (page - 1) * pageSize;

    let whereCondition = {};

    if (req.query.buscar) {
      whereCondition[Op.or] = [
        { nombre: { [Op.like]: `%${req.query.buscar}%` } },
        { licenceId: { [Op.like]: `%${req.query.buscar}%` } }
      ];
    }

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

    // Consulta para los productos del slider
    const sliderProducts = await model.findAll({
      where: {
        typeId: 1, // Aquí especifica el ID específico que deseas filtrar
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

    // Consulta para los productos de la página principal
    const { count, rows: products } = await model.findAndCountAll({
      where: {
        licenceId: "2", // Establecer la condición de licenceId aquí
        ...whereCondition, // Mantener las demás condiciones de búsqueda
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
      limit: pageSize,
      offset: offset,
      order: [[orderColumn, orderDirection]],
    });

    const totalPages = Math.ceil(count / pageSize);
    const categories = await category.findAll();

    // Renderizar la página principal y pasar los productos del slider como una variable aparte
    res.render("shop/marvel", { products, sliderProducts, currentPage: page, totalPages, categories });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const shopViewDV = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 9;
    const offset = (page - 1) * pageSize;

    let whereCondition = {};

    if (req.query.buscar) {
      whereCondition[Op.or] = [
        { nombre: { [Op.like]: `%${req.query.buscar}%` } },
        { licenceId: { [Op.like]: `%${req.query.buscar}%` } }
      ];
    }

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

    // Consulta para los productos del slider
    const sliderProducts = await model.findAll({
      where: {
        typeId: 1, // Aquí especifica el ID específico que deseas filtrar
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

    // Consulta para los productos de la página principal
    const { count, rows: products } = await model.findAndCountAll({
      where: {
        licenceId: "8", // Establecer la condición de licenceId aquí
        ...whereCondition, // Mantener las demás condiciones de búsqueda
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
      limit: pageSize,
      offset: offset,
      order: [[orderColumn, orderDirection]],
    });

    const totalPages = Math.ceil(count / pageSize);
    const categories = await category.findAll();

    // Renderizar la página principal y pasar los productos del slider como una variable aparte
    res.render("shop/dieverruckt", { products, sliderProducts, currentPage: page, totalPages, categories });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const shopViewHP = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 9;
    const offset = (page - 1) * pageSize;

    let whereCondition = {};

    if (req.query.buscar) {
      whereCondition[Op.or] = [
        { nombre: { [Op.like]: `%${req.query.buscar}%` } },
        { licenceId: { [Op.like]: `%${req.query.buscar}%` } }
      ];
    }

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

    // Consulta para los productos del slider
    const sliderProducts = await model.findAll({
      where: {
        typeId: 1, // Aquí especifica el ID específico que deseas filtrar
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

    // Consulta para los productos de la página principal
    const { count, rows: products } = await model.findAndCountAll({
      where: {
        licenceId: "4", // Establecer la condición de licenceId aquí
        ...whereCondition, // Mantener las demás condiciones de búsqueda
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
      limit: pageSize,
      offset: offset,
      order: [[orderColumn, orderDirection]],
    });

    const totalPages = Math.ceil(count / pageSize);
    const categories = await category.findAll();

    // Renderizar la página principal y pasar los productos del slider como una variable aparte
    res.render("shop/harrypotter", { products, sliderProducts, currentPage: page, totalPages, categories });
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
  shopViewDV,
  idView,
  itemView,
  cartView,
  checkoutView,
};
