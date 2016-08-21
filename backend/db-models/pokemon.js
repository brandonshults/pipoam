/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pokemon', {
    encounter_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    spawnpoint_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokemon_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    latitude: {
      type: 'DOUBLE',
      allowNull: false
    },
    longitude: {
      type: 'DOUBLE',
      allowNull: false
    },
    disappear_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'pokemon',
    timestamps: false
  });
};
