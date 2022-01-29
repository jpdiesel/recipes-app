import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../Components/Footer';
import Header from '../../../Components/Header';

function ExploreDrinks({ history }) {
  return (
    <>
      <Header history={ history } title="Explore Drinks" showSearchButton={ false } />
      <Link to="/explore/drinks/ingredients">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </button>
      </Link>
      <Link to="/as">
        <button type="button" data-testid="explore-surprise">Surprise me!</button>
      </Link>
      <Footer history={ history } />
    </>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExploreDrinks;
