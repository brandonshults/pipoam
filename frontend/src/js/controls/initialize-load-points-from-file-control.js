import ELEMENTS from '../elements';
import points from '../map/points';
import controls from './controls';

/**
 * Initialize event listeners for clicking on the "Load Points" button.
 * @module
 */
export default function () {
  ELEMENTS.LOAD_POINTS_FROM_FILE_CONTROL.addEventListener('change', event => pointsFileInputHandler(ELEMENTS.LOAD_POINTS_FROM_FILE_CONTROL));
}

/**
 * @private
 * @param {HTMLElement} inputElement The input element to attach the event listener to.
 * @param {google.maps.Map} map The map.
 */
function pointsFileInputHandler(inputElement) {
  const files = inputElement.files;
  const map = ELEMENTS.MAP.__mapInstance;

  if (files.length < 1) {
    return;
  }

  const fileReader = new FileReader();
  fileReader.onloadend = event => {
    if (event.target.error) {
      alert('There was an error loading your file');
    }

    const results = event.target.result;
    let loadedPoints;
    try {
      loadedPoints = JSON.parse(results);
    } catch (err) {
      alert('Failed to parse JSON from the file you loaded.');
    }

    points.setPoints(loadedPoints);
    controls.closeMenus();
  };
  fileReader.readAsText(files[0]);
}
