/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('versions', {
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    val: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'versions'
  });
};
