const { DataTypes } = require("sequelize");

module.exports = function (sequelize, dataTypes) {
  const List = sequelize.define("List", {
    list_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  });
  // List.associate = (models) => {
  //   List.hasOne(models.User, {
  //     onDelete: "NO ACTION",
  //   });
  // };
  return List;
};
