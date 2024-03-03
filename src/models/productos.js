const { DataTypes } = require("sequelize");

const sequelize = require("../config/conn");

const Producto = sequelize.define("Producto", {
   
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
    allowNull: true,
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
  
  (async () => {
    await sequelize.sync();
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true });
  })();
  
  module.exports = Producto;