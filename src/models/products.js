const { DataTypes } = require("sequelize");

const sequelize = require("../config/conn");

const category = require("./category");

const licence = require("./licence");

const products = sequelize.define("products", {
   
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: true,
  }, 
  dues: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  });

  products.belongsTo(category);
  products.belongsTo(licence);

  // (async () => {
  //   await sequelize.sync();
  //   // await sequelize.sync({ force: true });
  //   // await sequelize.sync({ alter: true });
  // })();
  
  module.exports = products;