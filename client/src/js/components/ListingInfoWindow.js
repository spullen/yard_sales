import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class ListingInfoWindow extends Component {
  render() {
    const { listing } = this.props;
    const { title, description, starts_at, ends_at, early_birds_allowed, address, latitude, longitude } = listing;

    return (
      <div className="listing-info">
        <h2>{title ? title : address}</h2>
        <div>
          <dl>
            <dt>Starts at</dt>
            <dd>{moment(starts_at).format('MM/DD/YYYY hh:mm a')}</dd>

            <dt>Ends at</dt>
            <dd>{moment(ends_at).format('MM/DD/YYYY hh:mm a')}</dd>

            <dt>Early birds?</dt>
            <dd>{early_birds_allowed ? 'Yes' : 'No'}</dd>

            <dt>Address</dt>
            <dd>{address}</dd>
          </dl>

          {(() => {
            if(description) {
              return <p>{description}</p>;
            }
          })()}
        </div>
      </div>
    );
  }
}

ListingInfoWindow.propTypes = {
  listing: PropTypes.object.isRequired
};

export default ListingInfoWindow;