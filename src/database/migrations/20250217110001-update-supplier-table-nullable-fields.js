'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('suppliers', 'logo', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('suppliers', 'state_origin', {
      type: Sequelize.STRING(50),
      allowNull: true,
    });
    await queryInterface.changeColumn('suppliers', 'cost_per_kWh', {
      type: Sequelize.DECIMAL(10, 4),
      allowNull: true,
    });
    await queryInterface.changeColumn('suppliers', 'min_kWh_limit', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('suppliers', 'total_clients', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
    await queryInterface.changeColumn('suppliers', 'avg_rating', {
      type: Sequelize.DECIMAL(3, 2),
      allowNull: true,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('suppliers', 'logo', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.changeColumn('suppliers', 'state_origin', {
      type: Sequelize.STRING(50),
      allowNull: false,
    });
    await queryInterface.changeColumn('suppliers', 'cost_per_kWh', {
      type: Sequelize.DECIMAL(10, 4),
      allowNull: false,
    });
    await queryInterface.changeColumn('suppliers', 'min_kWh_limit', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn('suppliers', 'total_clients', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.changeColumn('suppliers', 'avg_rating', {
      type: Sequelize.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0,
    });
  },
};