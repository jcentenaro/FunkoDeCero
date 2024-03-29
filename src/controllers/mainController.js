const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { validationResult } = require("express-validator");

const { Op } = require('sequelize');

const model = require("../models/products");
const category = require("../models/category");
const licence = require("../models/licence");

const index = async (req, res) => {
  try {
    // Consulta para los productos de la página principal
    const products = await model.findAll({
      include: [
        {
          model: category,
          attributes: ['nombre']
        },
        {
          model: licence,
          attributes: ['nombre']
        }
      ]
    });

    // Consulta para los productos del slider (typeId=1)
    const sliderProducts = await model.findAll({
      where: {
        typeId: 1
      },
      include: [
        {
          model: category,
          attributes: ['nombre']
        },
        {
          model: licence,
          attributes: ['nombre']
        }
      ]
    });

    res.render("index", { products, sliderProducts }); // Pasa los productos y productos del slider a la vista
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const contact = (req, res) => {
    res.render("contact");
};
const faqs =(req, res) => {
    res.render("faqs");
};
const us = (req, res) => {
    res.render("nosotros");
};

module.exports = {
    index,
    contact,
    faqs,
    us
};