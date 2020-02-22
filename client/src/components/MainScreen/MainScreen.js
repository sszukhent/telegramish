import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Chat from '../Chat/Chat';
import Search from '../Search/Search';
import RoomHeader from '../RoomHeader/RoomHeader';
import UserList from '../UserList/UserList';
import Footer from '../Footer/Footer';

const MainScreen = () => (
  <Router>
    <div id='app-container' class='container'>
      <div id='wrapper' class='card'>
        <div class='row app-header' style={{ margin: '0 auto' }}>
          <Route component={Search} />
          <Route component={RoomHeader} />
        </div>
        <div
          class='row app-body'
          style={{ minHeight: '82vh', margin: '0 auto' }}
        >
          <Route component={UserList} />
          <Route component={Chat} />
        </div>
        <div class='row app-footer'>
          <Route component={Footer} />
        </div>
      </div>
    </div>
  </Router>
);

export default MainScreen;
