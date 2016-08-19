import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class ListingItem extends Component {
  render() {
    const { listing } = this.props;
    const { title, starts_at, ends_at, early_birds_allowed, address } = listing;

    return (
      <div className="listing-item">
        {(() => {
          if(title) {
            return <h3>{title}</h3>;
          }
        })()}
        <h3>{address}</h3>
        <h3 className="listing-item-times">{moment(starts_at).format('MM/DD/YYYY hh:mm a')} to {moment(ends_at).format('MM/DD/YYYY hh:mm a')}</h3>
        <div>
          {early_birds_allowed ? 'Early birds allowed' : 'No early birds'}
        </div>
      </div>
    )
  }
}

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired  
};

export default ListingItem;