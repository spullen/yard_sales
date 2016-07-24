import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1><Link to="/">Yard Sales</Link></h1>
          <nav>
            <ul>
              <li><Link to="/new">Add Sale</Link></li>
            </ul>
          </nav>
        </header>
        {this.props.children}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);