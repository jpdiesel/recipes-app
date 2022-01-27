import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../Components/Footer';

function Drinks({ history }) {
  return (
    <>
      <h1>Drinks</h1>
      <Footer history={ history } />
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Drinks;
