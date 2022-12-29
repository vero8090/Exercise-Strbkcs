module.exports = (sequelize, DataTypes) => {
  const product_detail = sequelize.define('product_detail', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    calories: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});

  product_detail.associate = function (models) {
    // Assocations define here
    product_detail.belongsTo(models.product, {
      through: 'product_id'
    }),
    product_detail.belongsTo(models.size,{
      foreignKey:'size_id'
    })
  }
  return product_detail
}

