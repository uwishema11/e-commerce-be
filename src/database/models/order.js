import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Order.init(
    {
      products: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
