const { DataTypes } = require("sequelize");

const sequelize = require("../config/conn");

const licence = sequelize.define("licence", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  });

  
  module.exports = licence;