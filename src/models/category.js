const { DataTypes } = require("sequelize");

const sequelize = require("../config/conn");

const category = sequelize.define("category", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  });
  
  
  module.exports = category;