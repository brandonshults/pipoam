/**
 * Store references to commonly used dom elements.
 * @module ELEMENTS
 */
export default Object.freeze({
  /**
   * @type HTMLElement
   * @static
   */
  MAP: document.getElementById('map'),

  /**
   * @type HTMLElement
   * @static
   */
  CONTROLS: document.getElementById('controls'),

  /**
   * @type HTMLElement
   * @static
   */
  LOAD_POINTS_FROM_FILE_CONTROL: document.getElementById('load-from-file-control'),

  /**
   * @type HTMLElement
   * @static
   */
  MERGE_POINTS_FROM_FILE_CONTROL: document.getElementById('merge-from-file-control'),

  /**
   * @type HTMLElement
   * @static
   */
  API_KEY_CONTROL: document.getElementById('api-key-control'),

  /**
   * @type HTMLElement
   * @static
   */
  LOAD_FROM_DB_FORM: document.getElementById('load-from-db-form'),

  /**
   * @type HTMLElement
   * @static
   */
  EXPORT_ALL_POINTS_CONTROL: document.getElementById('export-all-points-control'),

  /**
   * @type HTMLElement
   * @static
   */
  CENTER_MAP_CONTROL: document.getElementById('center-map-control')
});
