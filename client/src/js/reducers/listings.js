export const listingsEventKeys = {
  clear: 'LISTINGS:CLEAR',
  load: 'LISTINGS:LOAD'
}

const reduceListings = (listingsCollection = {}, action) => {
  switch(action.type) {
    case listingsEventKeys.clear:
      return Object.assign({});
    case listingsEventKeys.load:
      return Object.assign({}, listingsCollection, action.payload);
    default:
      return listingsCollection;
  }
}

export default reduceListings;