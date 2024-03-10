
const data = require("../services/service_product");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { validationResult } = require("express-validator");

const model = require("../models/products");

const shopView = async (req, res) => {
  try {
    const products = await model.findAll();
    // console.log(productos);
    res.render("shop/shop", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


const idView = async (req, res) => {
  try {
    const product = await model.findByPk(req.params.id);
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
  idView,
  itemView,
  cartView,
  checkoutView,
};
