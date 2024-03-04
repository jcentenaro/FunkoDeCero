const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const {validationResult } = require("express-validator");

const model = require("../models/productos");

const shopView = async (req, res) => {
    try {
      const productos = await model.findAll();
      // console.log(productos);
      res.render("shop/shop", { productos });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
};
const idView = async (req, res) => {
    try {
      const producto = await model.findByPk(req.params.id);
  
      if(producto) {
        res.render("shop/item", { values: producto });
      } else {
        res.status(404).send("El Producto no existe");
      }
    } catch (error) {
      console.log(error);
    }  
};
 
const itemView = (req, res) => {
    res.send("Shop ITEM ID ADD");
};
const cartView = (req, res) => {
    res.send("Cart GET");
};
const checkoutView = (req, res) => {
    res.send("Cart POST");
};

module.exports = {
    shopView,
    idView,
    itemView,
    cartView,
    checkoutView
};