const { DataTypes } = require("sequelize");

module.exports = function (sequelize, dataTypes) {
  const List = sequelize.define("List", {
    list_Name: DataTypes.STRING,
  });
  List.associate = (models) => {
    List.hasOne(models.User, {
      onDelete: "NO ACTION",
    });
  };
  return List;
};
