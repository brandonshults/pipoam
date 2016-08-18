import points from './points';

/**
 * Initialize a drawing manager that only allows polygons.
 * When a polygon is drawn, add a click event listener to it.
 * @module
 * @param {google.maps.Map} map
 * @returns {google.maps.Map}
 */
export default function (map) {
  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['polygon']
    }
  });
  drawingManager.setMap(map);
  google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
    google.maps.event.addListener(polygon, 'click', createOverlayClickHandler(polygon))
  });
  return map;
}

/**
 * 
 * @param {google.maps.Polygon} polygon The polygon that was clicked
 * @returns {Function} An overly complicated event handler function that needs to be improved
 */
function createOverlayClickHandler(polygon) {
  const downloadElement = document.createElement('a');
  downloadElement.download = 'clipped-points.json';
  return function () {
    points.getPoints()
      .then(points => {
        const clippedPoints = points.filter(point => google.maps.geometry.poly.containsLocation(new google.maps.LatLng(point.lat, point.lng), polygon));
        const url = URL.createObjectURL(new Blob([JSON.stringify(clippedPoints)], {type: "application/json"}));
        downloadElement.href = url;
        downloadElement.click();
      });
  }
}
