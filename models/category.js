module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING
  }, {});

  category.associate = function (models) {
    // Assocations define here
    category.hasMany(models.product, {
      foreignKey: "category_id"
    })
  }
  return category
}

