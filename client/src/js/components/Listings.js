import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import ListingItem from './ListingItem';

class listings extends Component {

  render() {
    const { listings } = this.props;

    const listingItems = _.map(listings.listings, (listing) => {
      return <ListingItem key={`listing-item-${listing.id}`} listing={listing} />;
    });

    return (
      <div className="listings">
        {(() => {
          if(listingItems.length > 0) {
            return listingItems;
          } else {
            return (
              <div className="listing-item none">
                <h3>No Listings</h3>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

listings.propTypes = {
  listings: PropTypes.object
};

listings.defaultProps = {
  listings: {}
};

export default listings;