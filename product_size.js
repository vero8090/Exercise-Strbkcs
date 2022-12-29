module.exports = (sequelize, DataTypes) => {
  const product_size = sequelize.define('product_size', {
    product_detail_id: DataTypes.INTEGER,
    size_id: DataTypes.INTEGER
  }, {});

  product_size.associate = function (models) {
    // Assocations define here
    
  }
  return product_size
}