import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server'
import scriptLoader from 'react-async-script-loader';

import ListingInfoWindow from './ListingInfoWindow';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false
    }
  }

  componentWillReceiveProps(newProps) {
    const { isScriptLoaded, isScriptLoadSucceed, locationLoaded, latitude, longitude, listings } = newProps;

    if(isScriptLoaded && !this.props.isScriptLoaded) {
      if(isScriptLoadSucceed) {
        this.loadingComplete();
      } else {
        this.props.onError();
      }
    }

    if(this.props.longitude !== longitude || this.props.latitude !== latitude) {
      this.updateCoordinates(latitude, longitude);
    }

    if(this.props.listings !== listings) {
      this.renderListings(listings);
    }
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed, refreshLocation } = this.props
    if(isScriptLoaded && isScriptLoadSucceed) {
      this.loadingComplete();
    }
  }

  loadingComplete() {
    this.setState({mapLoaded: true});
  }

  updateCoordinates(latitude, longitude) {
    if(this.map) {
      this.map.panTo(new google.maps.LatLng(latitude, longitude));
    }
  }

  renderListings(listings) {
    if(this.map && listings && listings.listings) {
      // remove markers from map
      if(this.markers) {
        _.each(this.markers, (marker, id) => {
          marker.setMap(null);
        });
      }

      // reset markers and info windows
      this.markers = {};
      this.infoWindows = [];

      listings.listings.forEach((listing) => {
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(listing.latitude, listing.longitude),
          title: listing.address,
          map: this.map
        });

        let infoWindow = new google.maps.InfoWindow({
          content: ReactDOMServer.renderToString(<ListingInfoWindow listing={listing} />)
        });

        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        });

        this.markers[listing.id] = marker;
        this.infoWindows.push(infoWindow);
      });
    }
  }

  renderMap(el) {
    const { mapLoaded } = this.state;
    const { latitude, longitude, listings } = this.props;
    if(mapLoaded && el && !this.map) {
      this.map = new google.maps.Map(el, {
        center: {lat: latitude, lng: longitude},
        zoom: 12
      });
      
      this.renderListings(listings);
    }
  }
  
  render() {
    return <div className="map" ref={this.renderMap.bind(this)}>Loading...</div>;
  }
}

Map.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  listings: PropTypes.object
};

Map.defaultProps = {
  latitude: 0,
  longitude: 0,
  listings: {}
};

export default scriptLoader('https://maps.googleapis.com/maps/api/js')(Map);