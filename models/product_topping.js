module.exports = (sequelize, DataTypes) => {
  const product_topping = sequelize.define('product_topping', {
    product_id: DataTypes.INTEGER,
    topping_id: DataTypes.INTEGER
  }, {});

  product_topping.associate = function (models) {
    
  }
  return product_topping
}