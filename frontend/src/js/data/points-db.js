/** @type PouchDB */
import PouchDb from 'pouchdb';
const db = new PouchDb('pipoam');

/**
 * @private
 * @returns {Promise.<{_id: 'points', points: Array.<{lat: number, lng: number}>}>}
 */
const getPointsDocument = () => {
  return db.get('points').catch(function (err) {
    if (err.name === 'not_found') {
      return {
        _id: 'points',
        points: []
      };
    } else {
      throw err;
    }
  });
};

/**
 * Get and Set map points from the database.
 * @module
 */
export default Object.freeze({
  /**
   * @static
   * @returns {Promise.<Array.<{lat: number, lng: number}>>}
   */
  getPoints() {
    return getPointsDocument().then(document => document.points);
  },
  /**
   * @static
   * @param points
   * @returns {Promise.<Array.<{lat: number, lng: number}>>}
   */
  setPoints(points) {
    return getPointsDocument('points')
      .then(document => db.put(Object.assign({}, document, { points })))
      .then(() => points);
  }
});
