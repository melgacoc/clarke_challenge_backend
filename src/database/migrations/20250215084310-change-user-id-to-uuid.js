'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('contracts', 'user_id');

    await queryInterface.addColumn('contracts', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('contracts', 'user_id');

    await queryInterface.addColumn('contracts', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};