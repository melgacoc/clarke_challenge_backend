'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('contracts', 'supplier_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('contracts', 'user_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('contracts', 'supplier_name');
    await queryInterface.removeColumn('contracts', 'user_name');
  }
};