import initializeLoadPointsControl from './initialize-load-points-control';
import initializeApiKeyControl from './initialize-api-key-control';
import initializeSetLocationControl from './initialize-set-location-control';

export default function (map) {
  initializeLoadPointsControl(map);
  initializeSetLocationControl(map);
  initializeApiKeyControl();
  return map;
}
