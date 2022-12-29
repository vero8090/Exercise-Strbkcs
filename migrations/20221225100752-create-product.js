'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      name: {
        type: Sequelize.STRING
      },
      // jangan lupa references, type, sama allownull
      //kalo gak ntar error cannot read property 'tostring' of undefined
      category_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:Sequelize.INTEGER,
        references:{
          model:'categories',
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
    await queryInterface.dropTable('products');
  }
};