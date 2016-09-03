import initializeLoadAndMergeFromFileControl from './initialize-load-and-merge-from-file-control';
import initializeApiKeyControl from './initialize-api-key-control';
import initializeLoadFromDbControl from './initialize-load-from-db-control';
import initializeExportAllPointsControl from './initialize-export-all-points-control';
import initializeCenterMapControl from './initialize-center-map-control';

/**
 * Initialize the controls.  Pretty much just delegate out to methods that attach event handlers.
 * @module
 */
export default function () {
  initializeLoadAndMergeFromFileControl();
  initializeApiKeyControl();
  initializeLoadFromDbControl();
  initializeExportAllPointsControl();
  initializeCenterMapControl();
}
