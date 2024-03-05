const { DataTypes } = require("sequelize");

const sequelize = require("../config/conn");

const category = sequelize.define("category", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  });
  
  // (async () => {
  //   await sequelize.sync();
  //   // await sequelize.sync({ force: true });
  //   // await sequelize.sync({ alter: true });
  // })();
  
  module.exports = category;