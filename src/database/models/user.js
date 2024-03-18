/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {
        as: 'user',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      otpSecret: DataTypes.STRING,
      twoFactorEnabled: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      confirm_password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('admin', 'buyer', 'seller', 'manager'),
        defaultValue: 'buyer',
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
