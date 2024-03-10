const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { validationResult } = require("express-validator");

const model = require("../models/products");
const modelCategory = require("../models/category");
const modelLicence = require("../models/licence");

const index = async (req, res) => {
    try {
      const products = await model.findAll();
      // console.log(productos);
      res.render("index", { products });
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