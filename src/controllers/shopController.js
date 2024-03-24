const data = require("../services/service_product");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { validationResult } = require("express-validator");

const model = require("../models/products");
const category = require("../models/category");
const licence = require("../models/licence");

const shopView = async (req, res) => {  
  try {
    const page = parseInt(req.query.page) || 1; // Obtén el número de página desde la URL, o usa la página 1 si no se proporciona
    const pageSize = 6; // Define el tamaño de la página, es decir, cuántos productos mostrar por página

    // Calcula el offset para la consulta, es decir, el número de productos que se deben saltar para llegar a la página solicitada
    const offset = (page - 1) * pageSize;

    let whereCondition = {}; // Condiciones de búsqueda inicialmente vacías

    // Verifica si se proporcionó un parámetro de categoría en la solicitud
    if (req.query.categoryId) {
      // Si se proporcionó un ID de categoría, establece la condición de búsqueda para filtrar por esa categoría
      whereCondition.categoryId = req.query.categoryId;
    }

    const orderBy = req.query.orderBy || 'price-ascending'; // Obtén el parámetro de orden de la solicitud o establece un valor predeterminado
let orderColumn;
let orderDirection;

// Determina la columna y la dirección de la orden según el parámetro recibido
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

    // Consulta la base de datos para obtener los productos de la página actual, con la condición de búsqueda aplicada si corresponde
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
      where: whereCondition, // Aplica la condición de búsqueda
      limit: pageSize, // Limita la cantidad de productos devueltos por página
      offset: offset, // Salta los productos anteriores a la página actual
      order: [["nombre", "ASC"]], // Ordena los productos por el nombre del producto de forma ascendente
      order: [[orderColumn, orderDirection]], // Aplica la opción de orden
    });

    // Calcula el número total de productos para determinar el número total de páginas
    const totalProducts = await model.count();
    const totalPages = Math.ceil(totalProducts / pageSize);
    const categories = await category.findAll(); // Suponiendo que obtienes las categorías de la base de datos

    // Renderiza la vista y pasa los productos, categorías y otros datos necesarios
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
  idView,
  itemView,
  cartView,
  checkoutView,
};
