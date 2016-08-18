/** @type {PouchDB} */
import PouchDB from 'pouchdb';

const db = new PouchDB('pipoam');

/**
 * @private
 * @returns {Promise.<{_id: 'config', apiKey: String, startLocation: {lat: number, lng: number}}>}
 */
const getConfigDocument = () => {
  return db.get('config').catch(function (err) {
    if (err.name === 'not_found') {
      return {
        _id: 'config',
        apiKey: null,
        startLocation: null
      };
    } else {
      throw err;
    }
  });
};

/**
 * Get and Set configuration values from the database.
 * @module
 */
export default Object.freeze({
  /**
   * @static
   * @returns {Promise.<String>}
   */
  getApiKey() {
    return getConfigDocument().then(configDocument => configDocument.apiKey);
  },

  /**
   * @static
   * @param {String} apiKey
   * @returns {Promise.<String>}
   */
  setApiKey(apiKey)  {
    return getConfigDocument()
      .then(document => db.put(Object.assign({}, document, { apiKey })))
      .then(() => apiKey);
  },

  /**
   * @static
   * @returns {Promise.<{lat: number, lng: number}>}
   */
  getStartLocation() {
    return getConfigDocument().then(configDocument => configDocument.startLocation);
  },

  /**
   * @static
   * @param {{lat: number, lng: number}} latLngLiteral
   * @returns {Promise.<{lat: number, lng: number}>}
   */
  setStartLocation(latLngLiteral) {
    return getConfigDocument()
      .then(configDocument => db.put(Object.assign({}, configDocument, {startLocation: latLngLiteral})))
      .then(() => latLngLiteral);
  }
});
