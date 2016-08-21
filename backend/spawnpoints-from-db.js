const Sequelize = require('sequelize');

/**
 * @param {{host: Array, dialect: Array, storage: Array, dbName: Array, username: Array, password: Array}} fields
 * @returns {Promise.<Array.{lat: number, lng: number, spawnpoint_id: string, time: number}>}
 */
module.exports = function (fields) {
  const config = {
    host: fields.host[0],
    dialect: fields.dialect[0],
    storage: fields.storage[0],
    logging: false
  };

  const sequelize = new Sequelize(fields.dbName[0], fields.username[0], fields.password[0], config);
  const Pogom = sequelize.import('./db-models/pokemon.js');
  return Pogom
    .findAll({ group: 'spawnpoint_id' })
    .then(convertResults);
};

/**
 * @param {Array.<sequelize.Instance>} results
 * @returns {Array.<{lat: number, lng: number, spawnpoint_id: string, time: number}>}
 */
function convertResults(results) {
  return results
    .map(result => Object.freeze({
      lat: result.dataValues.latitude,
      lng: result.dataValues.longitude,
      spawnpoint_id: result.dataValues.spawnpoint_id,
      time: convertDisappearTimeToTime(result.dataValues.disappear_time)
    }));
}

/**
 * Convert disappearTime, which is a date stored in a string, to seconds of the hour.
 * @param {String} disappearTime
 * @returns {number}
 */
function convertDisappearTimeToTime(disappearTime) {
  const disappearDate = new Date(disappearTime);
  return (disappearDate.getMinutes() * 60 + disappearDate.getSeconds() * 2700) % 3600;
}
