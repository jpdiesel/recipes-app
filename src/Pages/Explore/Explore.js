import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

function Explore({ history }) {
  return (
    <div>
      <Header history={ history } title="Explore" showSearchButton={ false } />
      <Footer history={ history } />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Explore;
