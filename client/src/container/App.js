import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from '../store';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import PrivateRoute from '../components/routing/PrivateRoute';
import Chat from '../components/Chat/Chat';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/actions';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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

export default App;
