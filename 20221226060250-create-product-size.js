'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_sizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_detail_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"product_details",
          key:"id"
        }
      },
      size_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'sizes',
          key:'id'
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
    await queryInterface.dropTable('product_sizes');
  }
};