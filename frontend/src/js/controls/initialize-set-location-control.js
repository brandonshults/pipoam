import elements from '../elements';
import configDb from '../data/config-db';

/**
 * Initialize event listeners for clicking on the "Set Location" button.
 *
 * @module initializeSetLocationControl
 */
export default function (map) {
  let currentCenter = map.getCenter();
  map.addListener('center_changed', () => {
    currentCenter = map.getCenter();
  });

  elements.SET_LOCATION_CONTROL.addEventListener('click', () =>
    configDb.setLocation({ lat: currentCenter.lat(), lng: currentCenter.lng() }));
}
