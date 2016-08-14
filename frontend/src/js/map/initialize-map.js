import configDb from '../data/config-db';
import ELEMENTS from '../elements';
import points from './points';

export default function () {
  return determineStartingLocation()
    .then(configDb.setLocation)
    .then(initializeMap)
    .then(googleMap => points.loadPoints(googleMap)
      .then(() => googleMap));
}

function determineStartingLocation() {
  return configDb.getLocation().then(savedLocation => {
    if (savedLocation && savedLocation.hasOwnProperty('lat') && savedLocation.hasOwnProperty('lng')) {
      return savedLocation;
    } else if (navigator.geolocation) {
      return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(function (position) {
          resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
      });
    } else {
      return { lat: 43.5992568, lng: -122.334228 };
    }
  });
}

function initializeMap(location) {
  return new google.maps.Map(ELEMENTS.MAP, {
    center: location,
    mapTypeControl: true,
    zoom: 15
  });
}
