const { DataTypes } = require("sequelize");

const sequelize = require("../config/conn");

const Producto = sequelize.define("Producto", {
  sku: {
    type: DataTypes.STRING,
    allowNull: true,
  },  
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  });
  
  (async () => {
    await sequelize.sync();
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true });
  })();
  
  module.exports = Producto;