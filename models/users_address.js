module.exports = (sequelize, DataTypes) => {
  const users_address = sequelize.define('users_address', {
    receiver: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.INTEGER
  }, {});

  users_address.associate = function(models){
    // Assocations define here
    users_address.belongsTo(models.users, {
      foreignKey: 'users_id'
    })
  }
  return users_address
}