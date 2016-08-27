import ELEMENTS from '../elements';
import configDb from '../data/config-db';

/**
 * Initialize event listeners for clicking on the "Set Location" button.
 * @module
 */
export default function () {
  const map = ELEMENTS.MAP.__mapInstance;
  let currentCenter = map.getCenter();
  map.addListener('center_changed', () => {
    currentCenter = map.getCenter();
  });

  ELEMENTS.SET_LOCATION_CONTROL.addEventListener('click', () =>
    configDb.setStartLocation({ lat: currentCenter.lat(), lng: currentCenter.lng() }));
}
