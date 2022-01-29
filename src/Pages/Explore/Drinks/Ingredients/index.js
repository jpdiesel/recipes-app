import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../../../Components/Footer';
import Header from '../../../../Components/Header';

function ExDrinksIngredients({ history }) {
  return (
    <>
      <Header
        history={ history }
        title="Explore Ingredients"
        showSearchButton={ false }
      />
      <Footer history={ history } />
    </>
  );
}

ExDrinksIngredients.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExDrinksIngredients;
