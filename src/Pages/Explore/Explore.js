import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../Components/Footer';

function Explore({ history }) {
  return (
    <>
      <h1>Explore</h1>
      <Footer history={ history } />
    </>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Explore;
