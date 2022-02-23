const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Raza', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    imagen: {
      type: DataTypes.STRING,
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
      type: DataTypes.INTEGER,
    }
  });
};
