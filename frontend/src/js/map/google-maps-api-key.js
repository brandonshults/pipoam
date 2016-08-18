import configDb from '../data/config-db';

function getKey() {
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

function promptForKey() {
  return new Promise(resolve => {
    resolve(prompt('Please enter a google maps API key', ''));
  });
}

/**
 * Get the google maps API key from settings or prompt the user to input a new key.
 * @module
 */
export default Object.freeze({
  /**
   * Get the google maps API key from settings.
   * @static
   * @method
   * @returns {Promise.<String>}
   */
  getKey,

  /**
   * Prompt the user to enter a google maps api key.
   * @static
   * @method
   * @returns {Promise.<String>}
   */
  promptForKey,
  /**
   * Clear the api key from configuration and let the user know what's up.
   * @method
   * @static
   */
  clearKey
});
