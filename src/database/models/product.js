/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'users',
      });
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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
