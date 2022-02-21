const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Temperamento', {
    nombre: {
      type: DataTypes.STRING,
    }
  });
}
