import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';

function Explore({ history }) {
  return (
    <div>
      <Header history={ history } title="Explore" showSearchButton={ false } />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Explore;
