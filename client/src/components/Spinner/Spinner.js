import React, { Fragment } from 'react';
import spinner from '../Spinner/spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: '50%',
        height: '50%',
        margin: 'auto',
        display: 'block'
      }}
      alt='Loading...'
    />
  </Fragment>
);
