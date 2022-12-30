module.exports = (sequelize, DataTypes) => {
  const topping = sequelize.define('topping', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },   
    name: DataTypes.STRING,
   }, {});

  topping.associate = function (models) {
    // Assocations define here
    topping.belongsToMany(models.product, {
      through: 'product_topping'
    })

  }
  return topping
}