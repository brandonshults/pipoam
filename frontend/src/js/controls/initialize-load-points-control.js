/**
 * Initialize event listeners for clicking on the "Load Points" button.
 *
 * @module initializeLoadPointsControl
 */
import ELEMENTS from '../elements';
import points from '../map/points';

export default function (map) {
  ELEMENTS.LOAD_POINTS_CONTROL.addEventListener('change', event => pointsFileInputHandler(ELEMENTS.LOAD_POINTS_CONTROL, map));
}

/**
 * @private
 * @param {HTMLElement} inputElement The input element to attach the event listener to.
 * @param {Map} map The map.
 */
function pointsFileInputHandler(inputElement, map) {
  const files = inputElement.files;

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

    points.setPoints(loadedPoints, map);
  };
  fileReader.readAsText(files[0]);
}
