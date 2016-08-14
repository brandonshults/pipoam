/**
 * Get the google maps API key from settings or prompt the user to input a new key.
 * @module map/googleMapsApiKey
 */

import configDb from '../data/config-db';

/**
 * Get the google maps API key from settings.
 * @static
 * @returns {Promise.<string>}
 */
function getKey(useExisting) {
  return configDb.getApiKey()
    .then(key => {
      if (key) {
        return key;
      }
      return promptForKey()
        .then(newKey => configDb.setApiKey(newKey));
    });
}

function clearKey() {
  configDb.setApiKey(null)
    .then(() => alert('Your API Key has been cleared. Please refresh your browser for changes to take affect.'));
}

/**
 * Prompt the user to enter a google maps api key.
 * @static
 * @returns {Promise.<string>}
 */
function promptForKey() {
  return new Promise(resolve => {
    resolve(prompt('Please enter a google maps API key', ''));
  });
}

export default Object.freeze({
  getKey,
  promptForKey,
  clearKey
});
