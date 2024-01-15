'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      price: DataTypes.INTEGER,
      quantity: DataTypes.STRING,
      description: DataTypes.STRING,
      expireDate: DataTypes.DATE,
      isAvailable: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
