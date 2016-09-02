/** @type {PouchDB} */
import PouchDB from 'pouchdb';

const db = new PouchDB('pipoam');

/**
 * @typedef {{centerOnLoad: boolean}} PointsSettings
 * @type PointsSettings
 */
const DEFAULT_POINTS_SETTINGS = {
  centerOnLoad: false
};

/**
 * @typedef {{lat: Number, lng: Number, zoom: Number}} MapPosition
 * @type MapPosition
 */
const DEFAULT_MAP_POSITION = {
  lat: 43.5992568,
  lng: -122.334228,
  zoom: 2
};

/**
 * @typedef {Object} ConfigDocument
 * @property {String} _id
 * @property {String} apiKey
 * @property {PointsSettings} pointsSettings
 * @property {MapPosition} mapPosition
 */
/**
 * @private
 * @returns {Promise.<ConfigDocument>}
 */
const getConfigDocument = () => {
  return db.get('config').catch(function (err) {
    if (err.name === 'not_found') {
      return {
        _id: 'config',
        apiKey: null,
        pointsSettings: DEFAULT_POINTS_SETTINGS,
        mapPosition: DEFAULT_MAP_POSITION
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
   * @returns {Promise.<PointsSettings>}
   */
  getPointsSettings() {
    return getConfigDocument().then(configDocument => configDocument.pointsSettings || DEFAULT_POINTS_SETTINGS);
  },

  /**
   * @static
   * @param pointsSettings
   * @returns {Promise.<PointsSettings>}
   */
  setPointsSettings(pointsSettings) {
    return getConfigDocument()
      .then(document => db.put(Object.assign({}, document, { pointsSettings })))
      .then(() => pointsSettings);
  },

  /**
   * @static
   * @returns {Promise.<MapPosition>}
   */
  getMapPosition() {
    return getConfigDocument().then(configDocument => configDocument.mapPosition || DEFAULT_MAP_POSITION);
  },

  /**
   * @static
   * @param {MapPosition} mapPosition
   * @returns {Promise.<MapPosition>}
   */
  setMapPosition(mapPosition) {
    return getConfigDocument()
      .then(document => db.put(Object.assign({}, document, { mapPosition })))
      .then(() => mapPosition);
  }
});
