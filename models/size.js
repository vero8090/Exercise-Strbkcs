module.exports = (sequelize, DataTypes) => {
  const size = sequelize.define('size', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING
  }, {});

  size.associate = function (models) {
    // Assocations define here
    size.hasMany(models.product_detail, {
      foreignKey:'size_id'
    })
  }
  return size
}