import points from './points';

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
