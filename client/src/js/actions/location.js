import { locationEventKeys } from '../reducers/location';

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