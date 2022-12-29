'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      users_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references:{
          model: 'users',
          key:'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'products',
          key:"id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
  }
};