import mapsApiKey from './map/google-maps-api-key';
import loadGoogleMapsScript from './map/load-google-maps-script';
import initializeMap from './map/initialize-map';
import initializeDrawingManager from './map/initialize-drawing-manager';
import initializeControls from './controls/initialize-controls';

/**
 * All of the magic begins here.
 * <ol>
 *   <li>Procure Google Maps API key</li>
 *   <li>Load the google maps script with the key as a parameter</li>
 *   <li>Initialize the map</li>
 *   <li>Initialize the drawing manager for the map</li>
 *   <li>Initialize the controls for interacting with the map</li>
 * </ol>
 */
function entryPoint() {
  mapsApiKey.getKey()
    .then(loadGoogleMapsScript)
    .then(initializeMap)
    .then(initializeDrawingManager)
    .then(initializeControls);
}
entryPoint();
