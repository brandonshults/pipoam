import ELEMENTS from '../elements';
import points from '../map/points';
import controls from './controls';

/**
 * Initialize event listeners for clicking on the "Load Points" button.
 * @module
 */
export default function () {
  ELEMENTS.LOAD_POINTS_FROM_FILE_CONTROL.parentNode.addEventListener('change', event => pointsFileInputHandler(event.target));
}

/**
 * @private
 * @param {HTMLElement} inputElement The input element to attach the event listener to.
 */
function pointsFileInputHandler(inputElement) {
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
    if(inputElement === ELEMENTS.LOAD_POINTS_FROM_FILE_CONTROL) {
      points.setPoints(loadedPoints);
    } else if(inputElement === ELEMENTS.MERGE_POINTS_FROM_FILE_CONTROL) {
      points.mergePoints(loadedPoints);
    }

    controls.closeMenus();
  };
  fileReader.readAsText(files[0]);
}
