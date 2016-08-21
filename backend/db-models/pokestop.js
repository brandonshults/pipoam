/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pokestop', {
    pokestop_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
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
    },
    lure_expiration: {
      type: DataTypes.DATE,
      allowNull: true
    },
    active_fort_modifier: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'pokestop'
  });
};
