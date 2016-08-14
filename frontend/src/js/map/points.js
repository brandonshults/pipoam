import MarkerClusterer from 'imports?XModule=>undefined!exports?MarkerClusterer!js-marker-clusterer';
import pointsDb from '../data/points-db';

let clusterer;

export default Object.freeze({
  loadPoints(map) {
    clusterer = getClusterer(map);
    clusterer.clearMarkers();
    return pointsDb.getPoints()
      .then(pointsFromDb => pointsFromDb ? clusterer.addMarkers(pointsFromDb.map(convertPointToMarker)) : []);
  },
  getPoints() {
    return pointsDb.getPoints();
  },
  setPoints(points, map) {
    return pointsDb.setPoints(points)
      .then((() => this.loadPoints(map)).bind(this));
  }
});

function getClusterer(map) {
    return clusterer || new MarkerClusterer(map, [], {
      maxZoom: 14,
      imagePath: 'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m'
    });
}

function convertPointToMarker(point) {
  return new google.maps.Marker({
    position: point,
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wgNDQ0t+VykQAAAAW1JREFUGNMt0D0vJAEAgOF3zIyxuzd2zH6Q9RkfxUUikUOIaC4K8QP8AY1E7io/QOkIQSU0SsVVhCsuLlu5XEK2sBGJhtizduwyztqdLzNXrP55m1cAgGW5ThRmunv0r6mU2vdYen24uvr73bayG7Bn1AyrgiSvLc7N/3avryuB6/rBQ9EJ1jcv/Yi6lIbBZgARPo8Nj37aXvgyoegxGQEBzxGJaXHh+SXWdZ7NKUFwdizJijI9PtIfur0BPwBVBduCfB4GPvbS2Ng5ZT5JK5KqKq1tbWECCYwSlMxa4HoQT8hoelQ3n+SkVC6X85ZboSHygbAKilJDlTI4nsu/Z6MKtlfnWMWDX+mz1/qQT1SDZDPoOoQjcPIni/l4mgH/TgT3PpeTmnxfHh0aSQmJpIhtv/Hj6IKdrd1b297/BnZGqC1KhGByLqr1zrZ3JFuMQtExCplz+LkN1UPAeocASBBqAa0DzDeo5oAC4AH8BzshkZVam56AAAAAAElFTkSuQmCC"
  });
}
