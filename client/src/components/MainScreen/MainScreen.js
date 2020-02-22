import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Chat from '../Chat/Chat';
import Search from '../Search/Search';
import RoomHeader from '../RoomHeader/RoomHeader';
import UserList from '../UserList/UserList';

const MainScreen = () => (
  <Router>
    <div id='app-container' className='container'>
      <div id='wrapper' className='card'>
        <div className='row app-header' style={{ margin: '0 auto' }}>
          <Route component={Search} />
          <Route component={RoomHeader} />
        </div>
        <div
          className='row app-body'
          style={{ minHeight: '82vh', margin: '0 auto' }}
        >
          <Route component={UserList} />
          <Route component={Chat} />
        </div>
      </div>
    </div>
  </Router>
);

export default MainScreen;
