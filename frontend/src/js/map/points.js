/** @type MarkerClusterer */
import MarkerClusterer from 'exports?MarkerClusterer!js-marker-clusterer';
import pointsDb from '../data/points-db';
import configDb from '../data/config-db';
import ELEMENTS from '../elements';

/** @typedef {{lat: number, lng: number, ?}} PipoamPoint */

/**
 * A module for working with points on the map.
 * @module
 */
export default Object.freeze({
  /**
   * Load points from the db and add them to the map with clustering
   * @static
   * @returns {Promise.<Array.<PipoamPoint>>}
   */
  loadPoints() {
    let clusterer = getClusterer(ELEMENTS.MAP.__mapInstance);
    clusterer.clearMarkers();
    return pointsDb.getPoints()
      .then(pointsFromDb => {
        if (pointsFromDb) {
          clusterer.addMarkers(pointsFromDb.map(convertPointToMarker));
        }
        return centerOnLoad()
          .then(() => pointsFromDb);
      })
  },

  /**
   * @static
   * @returns {Promise.<Array.<PipoamPoint>>}
   */
  getPoints() {
    return pointsDb.getPoints();
  },

  /**
   * Given a list of points, set them in the db and then load them to the map
   * @static
   * @param {Array.<PipoamPoint>} points
   * @returns {Promise.<Promise.<PipoamPoint>>}
   */
  setPoints(points) {
    return pointsDb.setPoints(points)
      .then(this.loadPoints.bind(this))
  },

  /**
   * Reduce the points into an object whose keys are hashes created from the point's content
   * and whose values are the point itself.  The hashes are created in such a way that any two points
   * with the same key/value pairs (regardless of order) will produce the same hash.
   * Because two equivalent points will produce the same hash, the second point will overwrite the
   * first.  Now the values that are left in the object that is created are unique points, and can
   * be turned back into an array.
   * @static
   * @param {Array.<PipoamPoint>} points
   * @returns {Array.<PipoamPoint>}
   */
  dedupePoints(points) {
    const dedupedObject = points.reduce((dedupeObject, point) => {
      const hashForPoint = Object.keys(point).sort().reduce((hash, pointKey, index) => `${index === 0 ? '' : hash};${pointKey}:${point[pointKey]}`, '');
      dedupeObject[hashForPoint] = point;
      return dedupeObject;
    }, {});

    return Object.keys(dedupedObject).map(dedupeKey => dedupedObject[dedupeKey])
  },

  /**
   * Combine a new set of points with the existing set and then dedupe them.
   * @static
   * @param newPoints
   * @returns {Promise.<Array.<PipoamPoint>>}
   */
  mergePoints(newPoints) {
    return this.getPoints().then(existingPoints => {
      return pointsDb.setPoints(this.dedupePoints([].concat(newPoints).concat(existingPoints)))
        .then(this.loadPoints.bind(this));
    });
  }
});

/** @type {MarkerClusterer}*/
let markerClusterer = null;

/**
 * Given a google map, get (and create if necessary) the associated clusterer.
 * Doing it this way opens up the concept of multiple google maps, but this is sloppy and should
 * be done in a better way
 * @private
 * @param {google.maps.Map} map
 * @returns {MarkerClusterer}
 */
function getClusterer(map) {
  if (markerClusterer === null) {
    markerClusterer = new MarkerClusterer(map, [], {
      maxZoom: 14,
      imagePath: 'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m'
    });
  }
  return markerClusterer;
}

/**
 * @private
 * @param {{lat: number, lng: number}} point
 * @returns {google.maps.Marker}
 */
function convertPointToMarker(point) {
  return new google.maps.Marker({
    position: point,
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wgNDQ0t+VykQAAAAW1JREFUGNMt0D0vJAEAgOF3zIyxuzd2zH6Q9RkfxUUikUOIaC4K8QP8AY1E7io/QOkIQSU0SsVVhCsuLlu5XEK2sBGJhtizduwyztqdLzNXrP55m1cAgGW5ThRmunv0r6mU2vdYen24uvr73bayG7Bn1AyrgiSvLc7N/3avryuB6/rBQ9EJ1jcv/Yi6lIbBZgARPo8Nj37aXvgyoegxGQEBzxGJaXHh+SXWdZ7NKUFwdizJijI9PtIfur0BPwBVBduCfB4GPvbS2Ng5ZT5JK5KqKq1tbWECCYwSlMxa4HoQT8hoelQ3n+SkVC6X85ZboSHygbAKilJDlTI4nsu/Z6MKtlfnWMWDX+mz1/qQT1SDZDPoOoQjcPIni/l4mgH/TgT3PpeTmnxfHh0aSQmJpIhtv/Hj6IKdrd1b297/BnZGqC1KhGByLqr1zrZ3JFuMQtExCplz+LkN1UPAeocASBBqAa0DzDeo5oAC4AH8BzshkZVam56AAAAAAElFTkSuQmCC"
  });
}

/**
 * Adjust the viewport to fit all of the points on the map
 * @private
 * @returns {Promise}
 */
function centerOnLoad() {
  return configDb.getPointsSettings()
    .then(pointsSettings => {
      if (pointsSettings.centerOnLoad) {
        const map = ELEMENTS.MAP.__mapInstance;
        const clusterer = getClusterer(map);
        const bounds = new google.maps.LatLngBounds();
        clusterer.getMarkers().forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
      }
    });
}

