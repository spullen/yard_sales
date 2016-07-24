import axios from 'axios';
import { push } from 'react-router-redux';

import { listingsEventKeys } from '../reducers/listings';

export const createListing = (title, description, startsAt, endsAt, earlyBirdsAllowed, 
                              street1, street2, city, state, postalCode) => {
  const data = {
    title: title, 
    description: description, 
    starts_at: startsAt, 
    ends_at: endsAt, 
    early_birds_allowed: earlyBirdsAllowed, 
    street1: street1, 
    street2: street2, 
    city: city, 
    state: state, 
    postal_code: postalCode 
  };

  return (dispatch) => {
    axios({
      url: '/listings',
      method: 'post',
      data: data
    }).then((response) => {
      // TODO: Need flash notifications
      alert('Successfully created listing.');

      dispatch(push('/'));
    }).catch((response) => {
      console.error('createListing', response);
      alert('Error creating listing, please try again later.');
    });
  }
}

export const loadListings = (latitude = null, longitude = null, page = 1) => {
  return (dispatch) => {
    axios({
      url: '/listings',
      params: {
        page: page,
        latitude: latitude,
        longitude: longitude
      }
    }).then((response) => {
      dispatch({
        type: listingsEventKeys.load,
        payload: response.data
      })
    }).catch((response) => {
      console.error('loadListings', response);
    });
  }
}