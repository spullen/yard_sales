import { locationEventKeys } from '../reducers/location';

let geocoder = null;

const getGeocoder = () => {
  if(geocoder === null) {
    geocoder = new google.maps.Geocoder();
  }
  return geocoder;
}

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude
        })
      });
    } else {
      reject();
    }
  });
}

export const refresh = () => {
  return (dispatch) => {
    getCurrentLocation()
    .then((location) => {
      dispatch({
        type: locationEventKeys.create,
        payload: location
      });
    })
    .catch(() => {
      dispatch({
        type: locationEventKeys.create,
        payload: {}
      });
    });
  }
}

export const query = (query) => {
  return (dispatch) => {
    getGeocoder().geocode({ 'address': query }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        const latLng = results[0].geometry.location;
        dispatch({
          type: locationEventKeys.create,
          payload: {latitude: latLng.lat(), longitude: latLng.lng()}
        });
      } else {
        alert('Unable to process request');
      }
    });
  }
}