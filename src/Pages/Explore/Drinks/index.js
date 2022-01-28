import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../../Components/Footer';

function ExploreDrinks({ history }) {
  return (
    <>
      <h1>ExploreDrinks</h1>
      <Footer history={ history } />
    </>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExploreDrinks;
