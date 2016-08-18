import ELEMENTS from '../elements';
import googleMapsApiKey from '../map/google-maps-api-key';

/**
 * Initialize event listeners for clicking on the "API Key" button.
 * @module
 */
export default function () {
  ELEMENTS.API_KEY_CONTROL.addEventListener('click', googleMapsApiKey.clearKey);
}
