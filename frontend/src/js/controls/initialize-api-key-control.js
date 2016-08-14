/**
 * Initialize event listeners for clicking on the "API Key" button.
 *
 * @module initializeApiKeyControl
 */
import ELEMENTS from '../elements';
import googleMapsApiKey from '../map/google-maps-api-key';

export default function () {
  ELEMENTS.API_KEY_CONTROL.addEventListener('click', changeApiKeyHandler);
}

function changeApiKeyHandler() {
  googleMapsApiKey.clearKey();
}
