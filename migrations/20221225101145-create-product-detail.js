'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_details', {
      calories: {
        type: Sequelize.INTEGER
      },
      size_id: {
        type: Sequelize.INTEGER,
        defaultValue:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'sizes',
          key:"id"
        }
      },
          price: {
        type: Sequelize.INTEGER
      },
      // jangan lupa references, type, sama allownull
      //kalo gak ntar error cannot read property 'tostring' of undefined
      product_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'products',
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
    await queryInterface.dropTable('product_details');
  }
};