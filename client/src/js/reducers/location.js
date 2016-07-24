export const locationEventKeys = {
  create: 'LOCATION:CREATE'
}

const reduceLocation = (location = {loaded: false, latitude: 0, longitude: 0}, action) => {
  switch(action.type) {
    case locationEventKeys.create:
      return Object.assign({}, location, action.payload, {loaded: true});
    default:
      return location;
  }
}

export default reduceLocation;