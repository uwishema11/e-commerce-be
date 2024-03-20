// Assuming your Sequelize import is at the top of your file
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM(['admin', 'buyer', 'seller', 'manager']),
        defaultValue: 'seller',
      },
      password: {
        type: Sequelize.STRING,
      },
      confirm_password: {
        type: Sequelize.STRING,
      },
      otpSecret: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      twoFactorEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Users', { force: true, cascade: true });
  },
};
