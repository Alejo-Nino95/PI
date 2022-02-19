const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Raza', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anosvida: {
      type: DataTypes.STRING,
    }
  });
  sequelize.define('Temperamento', {
    ID: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
    }
  });
};
