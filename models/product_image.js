module.exports = (sequelize, DataTypes) => {
  const product_image = sequelize.define('product_image', {
    url: DataTypes.STRING
  }, {});

  product_image.associate = function (models) {
    // Assocations define here
    product_image.belongsTo(models.product,{
      foreignKey:'product_id'
    })
  }
  return product_image
}
