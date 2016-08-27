import configDb from '../data/config-db';
import ELEMENTS from '../elements';
import points from './points';

/**
 * Determine a starting location, instantiate the map, populate pre-existing points.
 * @module
 * @returns {Promise.<Promise.<google.maps.Map>>}
 */
export default function () {
  return determineStartingLocation()
    .then(configDb.setStartLocation)
    .then(initializeMap)
    .then(points.loadPoints);
}

/**
 * Pull a starting location from the DB.  If that fails, get the user's location from the browser.
 * If that fails, use a default fallback.
 * @private
 * @returns {Promise.<{lat: number, lng: number}>}
 */
function determineStartingLocation() {
  return configDb.getStartLocation().then(savedLocation => {
    if (savedLocation && savedLocation.hasOwnProperty('lat') && savedLocation.hasOwnProperty('lng')) {
      return savedLocation;
    } else if (navigator.geolocation) {
      return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(function (position) {
          resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
      });
    } else {
      return { lat: 43.5992568, lng: -122.334228 };
    }
  });
}

/**
 * @private
 * @param centerLocation
 * @returns {google.maps.Map}
 */
function initializeMap(centerLocation) {
  const mapInstance = new google.maps.Map(ELEMENTS.MAP, {
    center: centerLocation,
    mapTypeControl: true,
    zoom: 15
  });
  ELEMENTS.MAP.__mapInstance = mapInstance;
  return mapInstance;
}
