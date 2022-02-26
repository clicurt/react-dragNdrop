const Sequelize = require("sequelize");
const db = require("../config/database");

/**
 * database table
 */
const ImageModel = db.define("image", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(50)
  },
  image: {
    type: Sequelize.BLOB("long")
  }
});

module.exports = ImageModel;
