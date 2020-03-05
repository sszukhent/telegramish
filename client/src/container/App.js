import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../store';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
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
      <Route path='/' exact component={Login} />
      <Route path='/Register' exact component={Register} />
      <Route path='/chat' exact component={Chat} />
    </Router>
  );
};

export default App;
