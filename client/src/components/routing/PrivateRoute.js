import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';

const PrivateRoute = ({
  component: Component,
  auth: { user, isAuthenticated, authStateLoading, convoStateLoaded, token },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated || !token || !user ? (
        <Redirect to='/' />
      ) : isAuthenticated && !authStateLoading && !convoStateLoaded ? (
        <Component {...props} />
      ) : (
        <Spinner />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
