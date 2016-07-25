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

  resetToCurrentLocation(e) {
    e.preventDefault();
    this.props.refreshLocation();
  }

  render() {
    return (
      <div className="search">
        <div>
          <form onSubmit={this.handleQuery.bind(this)}>
            <input type="text" ref={(el) => this.search = el} />
            <button type="submit">Search</button>
          </form>
        </div>
        <div>
          <a href="#" className="current-location-btn" onClick={this.resetToCurrentLocation.bind(this)}><i className="fa fa-crosshairs" /></a>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  query: PropTypes.func.isRequired,
  refreshLocation: PropTypes.func.isRequired
};

// TODO the google maps should just be loaded at the app level so shared components can know
export default scriptLoader('https://maps.googleapis.com/maps/api/js')(Search);