/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gym', {
    gym_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    team_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    guard_pokemon_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    gym_points: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
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
    last_modified: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'gym'
  });
};
