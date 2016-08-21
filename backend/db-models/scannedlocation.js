/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('scannedlocation', {
    latitude: {
      type: 'DOUBLE',
      allowNull: false,
      primaryKey: true
    },
    longitude: {
      type: 'DOUBLE',
      allowNull: false,
      primaryKey: true
    },
    last_modified: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'scannedlocation'
  });
};
