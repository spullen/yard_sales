import React, { Component, PropTypes } from 'react';
import scriptLoader from 'react-async-script-loader';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false
    }
  }

  componentWillReceiveProps(newProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = newProps;

    if(isScriptLoaded && !this.props.isScriptLoaded) {
      if(isScriptLoadSucceed) {
        this.loadingComplete();
      } else {
        this.props.onError();
      }
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

  handleQuery(e) {
    e.preventDefault();
    const { mapLoaded } = this.state;
    if(mapLoaded && this.search && this.search.value && this.search.value.length > 0) {
      this.props.query(this.search.value);
    }
  }

  handleInputQuery(e) {
    if(e && e.charCode === 13) {
      this.handleQuery(e);
    }
  }

  resetToCurrentLocation(e) {
    e.preventDefault();
    this.props.refreshLocation();
  }

  render() {
    return (
      <div className="search">
        <input type="text" ref={(el) => this.search = el} onKeyPress={this.handleInputQuery.bind(this)} />
        <a className="btn search-btn" onClick={this.handleQuery.bind(this)}>Search</a>
        <a className="btn current-location-btn" onClick={this.resetToCurrentLocation.bind(this)}><i className="fa fa-crosshairs" /></a>
      </div>
    );
  }
}

Search.propTypes = {
  query: PropTypes.func.isRequired,
  refreshLocation: PropTypes.func.isRequired
};

// TODO the google maps should just be loaded at the app level so shared components can know. see note in index.js
export default scriptLoader('https://maps.googleapis.com/maps/api/js')(Search);