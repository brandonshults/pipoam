import mapsApiKey from './map/google-maps-api-key';
import loadGoogleMapsScript from './map/load-google-maps-script';
import initializeMap from './map/initialize-map';
import initializeDrawingManager from './map/initialize-drawing-manager';
import initializeControls from './controls/initialize-controls';


mapsApiKey.getKey()
  .then(loadGoogleMapsScript)
  .then(initializeMap)
  .then(initializeDrawingManager)
  .then(initializeControls);

