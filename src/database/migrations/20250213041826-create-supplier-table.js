'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suppliers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      logo: {
        type: Sequelize.TEXT,
      },
      state_origin: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      cost_per_kWh: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
      },
      min_kWh_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_clients: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      avg_rating: {
        type: Sequelize.DECIMAL(3, 2),
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('suppliers');
  },
};
