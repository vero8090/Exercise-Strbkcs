module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define('cart', {
    users_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {});

  cart.associate = function (models) {
    // // Assocations define here
    // cart.belongsToMany(models.product_detail, {
    //   through: 'product_cart'
  }
  return cart
}