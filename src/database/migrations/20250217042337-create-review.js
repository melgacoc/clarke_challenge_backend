'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addConstraint('reviews', {
      fields: ['user_id', 'supplier_id'],
      type: 'unique',
      name: 'unique_user_supplier'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reviews');
  }
};