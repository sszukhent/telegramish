import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import store from '../store';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import PrivateRoute from '../components/routing/PrivateRoute';
import Chat from '../components/Chat/Chat';
import setAuthToken from '../utils/setAuthToken';
import * as actionCreators from '../actions/actions';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = (props) => {
  const {
    authState,
    convoState,
    loadUser,
    loadUsersList,
    loadConvo,
    authStateLoaded,
    convoStateLoaded,
  } = props;
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  useEffect(() => {
    if (!authState.user && authState.users.length <= 0) {
      loadUser();
    } else if (
      authState.user &&
      authState.users.length <= 0 &&
      authState.isAuthenticated
    ) {
      loadUsersList();
    } else if (
      authState.user &&
      authState.users.length > 0 &&
      convoState.currentConversations.length <= 0 &&
      authState.isAuthenticated
    ) {
      loadConvo();
    } else if (
      authState.user &&
      authState.users.length > 0 &&
      authState.isAuthenticated
    ) {
      authStateLoaded();
    } else if (convoState.currentConversations.length > 0) {
      convoStateLoaded();
    } else if (!authState.isAuthenticated) {
      console.log('Logged out');
      return;
    }

    return;
  }, [
    authState.user.name,
    authState.users.length,
    convoState.currentConversations,
  ]);

  return (
    <Router>
      <Switch>
        <Route exact path='/' exact component={Login} />
        <Route exact path='/Register' exact component={Register} />
        <PrivateRoute exact path='/chat' exact component={Chat} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  authState: state.auth,
  convoState: state.conversations,
});

export default connect(mapStateToProps, actionCreators)(App);
