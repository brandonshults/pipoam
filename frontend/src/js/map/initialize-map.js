import ELEMENTS from '../elements';
import points from './points';
import configDb from '../data/config-db';
import debounce from 'debounce';

/**
 * Determine a starting location, instantiate the map, populate pre-existing points.
 * @module
 * @returns {Promise.<Promise.<google.maps.Map>>}
 */
export default function () {
  return configDb.getMapPosition()
    .then(initializeMap)
    .then(points.loadPoints);
}

/**
 * @private
 * @param {MapPosition} mapPosition
 * @returns {google.maps.Map}
 */
function initializeMap(mapPosition) {
  const mapInstance = new google.maps.Map(ELEMENTS.MAP, {
    center: { lat: mapPosition.lat, lng: mapPosition.lng },
    mapTypeControl: true,
    zoom: mapPosition.zoom
  });
  ELEMENTS.MAP.__mapInstance = mapInstance;

  mapInstance.addListener('bounds_changed', debounce(() => {
    const center = mapInstance.getCenter();
    return configDb.setMapPosition({
      lat: center.lat(),
      lng: center.lng(),
      zoom: mapInstance.getZoom()
    })
  }, 1000));
  return mapInstance;
}
