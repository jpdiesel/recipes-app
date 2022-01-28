import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../../../Components/Footer';

function ExDrinksIngredients({ history }) {
  return (
    <>
      <h1>ExDrinksIngredients</h1>
      <Footer history={ history } />
    </>
  );
}

ExDrinksIngredients.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExDrinksIngredients;
