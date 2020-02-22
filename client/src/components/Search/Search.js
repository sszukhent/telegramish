import React, { Fragment } from 'react';

import '../Components.css';

const Search = () => {
  return (
    <Fragment>
      <div className='col s4'>
        <div id='chat-header-search'>
          <input placeholder='Search' type='text' />
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
