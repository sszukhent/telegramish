import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import MainScreen from './components/MainScreen/MainScreen';

const App = () => (
  <Router>
    <Route path='/' exact component={Join} />
    <Route path='/chat' exact component={MainScreen} />
  </Router>
);

export default App;
