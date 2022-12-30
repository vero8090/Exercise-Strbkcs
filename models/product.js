module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING
  }, {});

  product.associate = function (models) {
    // Assocations define here
    product.belongsTo(models.category, {
      through: 'category_id'
    }),
    product.hasMany(models.product_detail,{
      foreignKey:'product_id'
    }),
    product.belongsToMany(models.topping,{
      through:'product_topping'
    }),
    product.belongsToMany(models.users,{
      through: 'cart'
    }),
    product.hasOne(models.product_image,{
      foreignKey:'product_id'
    })
  }
  return product
}