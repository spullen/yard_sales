import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Datetime from 'react-datetime';
import Select from 'react-select';

var validate = require('validate.js');

import { createListing } from '../actions/listings';

import states from '../utils/states';

const defaultState = {
  title: '', 
  description: '', 
  startsAt: null, 
  endsAt: null, 
  earlyBirdsAllowed: false,                  
  street1: '', 
  street2: '', 
  city: '', 
  state: '', 
  postalCode: '',
  errors: {}
};

const constraints = {
  startsAt: {
    presence: true
  },
  endsAt: {
    presence: true
  },
  street1: {
    presence: true
  },
  city: {
    presence: true
  },
  state: {
    presence: true
  },
  postalCode: {
    presence: true
  },
};

class CreateListing extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleSubmit(e) {
    e.preventDefault();

    const errors = validate(this.state, constraints, {fullMessages: false});

    if(errors) {
      this.setState({errors: errors});
    } else {
      const {title, description, startsAt, endsAt, earlyBirdsAllowed, street1, street2, city, state, postalCode} = this.state;
      this.props.create(title, description, startsAt, endsAt, earlyBirdsAllowed, street1, street2, city, state, postalCode);
      this.setState(defaultState);
    }
  }

  handleAttributeChange(attribute, value) {
    let data = {};
    data[attribute] = value;

    const constraint = constraints[attribute];

    if(constraint) {
      const { errors } = this.state;

      let dataError = {};
      dataError[attribute] = null;

      const error = validate.single(value, constraint);

      if(error) {
        dataError[attribute] = error;
      }

      const dataErrors = {errors: Object.assign({}, errors, dataError)}

      data = Object.assign({}, data, dataErrors);
    }

    this.setState(data);
  }

  handleOnChange(e) {
    this.handleAttributeChange(e.target.getAttribute('name'), e.target.value);
  }

  handleOnSelectChange(attribute, selectedOption) {
    let value = null;
    if(selectedOption) {
      value = selectedOption.value;
    }
    this.handleAttributeChange(attribute, value);
  }

  renderErrorClass(attribute) {
    const { errors } = this.state;
    if(errors && errors[attribute]) {
      return 'has-error';
    } else {
      return '';
    }
  }

  renderErrorMessage(attribute) {
    const { errors } = this.state;
    if(errors && errors[attribute]) {
      return errors[attribute].map((error, i) => {
        return <div key={`form-error-${attribute}-${i}`} className="help-block">{error}</div>;
      });
    } else {
      return '';
    }
  }

  render() {
    const {title, description, startsAt, endsAt, earlyBirdsAllowed, street1, street2, city, state, postalCode} = this.state;

    return (
      <div>
        <h2>Add Listing</h2>
        <form onSubmit={this.handleSubmit.bind(this)} autoComplete={false}>
          <div className={`form-group ${this.renderErrorClass('title')}`}>
            <label>Title:</label>
            <div className="form-control">
              <input type="text" name="title" defaultValue={title} onChange={this.handleOnChange.bind(this)} />
              {this.renderErrorMessage('title')}
            </div>
          </div>
          
          <div className={`form-group ${this.renderErrorClass('startsAt')}`}>
            <label>Starts:</label>
            <div className="form-control">
              <Datetime inputProps={{name: 'startsAt'}} 
                        defaultValue={startsAt} 
                        onChange={(val) => this.handleAttributeChange('startsAt', val)} 
                        isValidDate={(current, selected) => {
                          return current > moment();
                        }} />
              {this.renderErrorMessage('startsAt')}
            </div>
          </div>

          <div className={`form-group ${this.renderErrorClass('endsAt')}`}>
            <label>Ends:</label>
            <div className="form-control">
              <Datetime inputProps={{name: 'endsAt'}} 
                        defaultValue={endsAt} 
                        onChange={(val) => this.handleAttributeChange('endsAt', val)} 
                        isValidDate={(current, selected) => {
                          return current > moment();
                        }} />
              {this.renderErrorMessage('endsAt')}
            </div>
          </div>

          <div className={`form-group ${this.renderErrorClass('earlyBirdsAllowed')}`}>
            <label>Early Birds Allowed?:</label>
            <div className="form-control">
              <input type="checkbox" name="earlyBirdsAllowed" defaultChecked={earlyBirdsAllowed} onChange={this.handleOnChange.bind(this)} />
              {this.renderErrorMessage('earlyBirdsAllowed')}
            </div>
          </div>

          <div className={`form-group ${this.renderErrorClass('street1')}`}>
            <label>Address Line 1:</label>
            <div className="form-control">
              <input type="text" name="street1" defaultValue={street1} onChange={this.handleOnChange.bind(this)} />
              {this.renderErrorMessage('street1')}
            </div>
          </div>

          <div className={`form-group ${this.renderErrorClass('street2')}`}>
            <label>Address Line 2:</label>
            <div className="form-control">
              <input type="text" name="street2" defaultValue={street2} onChange={this.handleOnChange.bind(this)} />
              {this.renderErrorMessage('street2')}
            </div>
          </div>

          <div className={`form-group ${this.renderErrorClass('city')}`}>
            <label>City:</label>
            <div className="form-control">
              <input type="text" name="city" defaultValue={city} onChange={this.handleOnChange.bind(this)} />
              {this.renderErrorMessage('city')}
            </div>
          </div>

          <div className={`form-group ${this.renderErrorClass('state')}`}>
            <label>State:</label>
            <div className="form-control">
              <Select name="state" value={state} options={states} onChange={(val) => this.handleOnSelectChange('state', val)} />
              {this.renderErrorMessage('state')}
            </div>
          </div>

          <div className={`form-group ${this.renderErrorClass('postalCode')}`}>
            <label>Postal Code:</label>
            <div className="form-control">
              <input type="text" name="postalCode" defaultValue={postalCode} onChange={this.handleOnChange.bind(this)} />
              {this.renderErrorMessage('postalCode')}
            </div>
          </div>
          <div className={`form-group ${this.renderErrorClass('description')}`}>
            <label>Description:</label>
            <div className="form-control">
              <textarea name="description" defaultValue={description} onChange={this.handleOnChange.bind(this)} />
              {this.renderErrorMessage('description')}
            </div>
          </div>
          <div className={`form-group ${this.renderErrorClass('')}`}>
            <div className="form-control">
              <button type="submit">Add Listing</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, routerProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    create: bindActionCreators(createListing, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListing);