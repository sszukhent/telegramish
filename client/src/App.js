import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Search from './components/Search/Search';
import RoomHeader from './components/RoomHeader/RoomHeader';
import UserList from './components/UserList/UserList';
import Footer from './components/Footer/Footer';

const App = () => (
  <Router>
    <Route path='/' exact component={Join} />
    <div id='app-container' class='container'>
      <div id='wrapper' class='card'>
        <div class='row app-header' style={{ margin: '0 auto' }}>
          <Route path='/chat' component={Search} />
          <Route path='/chat' component={RoomHeader} />
        </div>
        <div
          class='row app-body'
          style={{ minHeight: '82vh', margin: '0 auto' }}
        >
          <Route path='/chat' component={UserList} />
          <Route path='/chat' component={Chat} />
        </div>
        <div class='row app-footer'>
          <Route path='/chat' component={Footer} />
        </div>
      </div>
    </div>
  </Router>
);

export default App;
