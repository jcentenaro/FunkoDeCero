const { DataTypes } = require("sequelize");

const sequelize = require("../config/conn");

const type = sequelize.define("type", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  });

  
  module.exports = type;