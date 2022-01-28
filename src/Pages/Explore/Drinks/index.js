import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../../Components/Footer';
import Header from '../../../Components/Header';

function ExploreDrinks({ history }) {
  return (
    <>
      <Header history={ history } title="Explore Drinks" showSearchButton={ false } />
      <Footer history={ history } />
    </>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExploreDrinks;
