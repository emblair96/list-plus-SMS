const { DataTypes } = require("sequelize");

module.exports = function (sequelize, dataTypes) {
  let User = sequelize.define("User", {
    phone_number: DataTypes.STRING,
    // is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  });
  return User;
};
