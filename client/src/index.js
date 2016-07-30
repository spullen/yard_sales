require('./styles/main.scss');

require.context('./', true, /^\.\/.*\.html/);

require('es6-promise').polyfill();

import axios from 'axios';

if(process.env.NODE_ENV === undefined || process.env.NODE_ENV !== 'production') {
  axios.defaults.baseURL = 'http://localhost:3000';
}

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';

import location from './js/reducers/location';
import listings from './js/reducers/listings';

const store = createStore(
  combineReducers({
    location,
    listings,
    routing: routerReducer
  }),
  applyMiddleware(routerMiddleware(browserHistory), thunk)
);

const history = syncHistoryWithStore(browserHistory, store);

// TODO: instead of using the async script loader library, would be better to do it here
// Create script tag with src and async attribute. Add onload (and the IE8 and older version) to the element
// Pass the store into this init function which lets the app know that the script has been loaded

import App from './js/components/App';
import ListingsContainer from './js/components/ListingsContainer';
import CreateListing from './js/components/CreateListing';
import PageNotFound from './js/components/PageNotFound';

const routes = (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={ListingsContainer} />
      <Route path="new" component={CreateListing} />
      <Route path="*" component={PageNotFound} />
    </Route>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes(store)}
    </Router>
  </Provider>,
  document.getElementById('app')
);