const { DataTypes } = require("sequelize");

const sequelize = require("../config/conn");

const users = sequelize.define("user", {
   
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  });
  
  (async () => {
    await sequelize.sync();
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true });
  })();
  
  module.exports = users;