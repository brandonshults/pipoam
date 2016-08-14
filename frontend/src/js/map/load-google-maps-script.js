import configDb from '../data/config-db';

/**
 * Load the google maps api script using the key stored in settings (or inputted by the user)
 * @module map/loadGoogleMapsScript
 * @param {string} apiKey The Google Maps API Key.  See https://developers.google.com/maps/documentation/javascript/get-api-key for more information.
 * @returns {Promise} Resolves on success when the script has loaded.  Rejects on failure.
 */
export default function (apiKey) {
  return new Promise((resolve, reject) => {
    window.gm_authFailure = () => configDb.setApiKey('');
    window.__gmapsCallback = resolve;

    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.onerror = () => reject(`Error loading google maps script: ${scriptElement.src}`);
    scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=__gmapsCallback&libraries=drawing`;
    document.body.appendChild(scriptElement);
  });
}
