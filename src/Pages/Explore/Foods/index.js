import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../Components/Footer';
import Header from '../../../Components/Header';

function ExploreFoods({ history }) {
  return (
    <>
      <Header history={ history } title="Explore Foods" />
      <Link to="/explore/foods/ingredients">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button
          type="button"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </button>
      </Link>
      <Link to="/as">
        <button type="button" data-testid="explore-surprise">Surprise me!</button>
      </Link>
      <Footer history={ history } />
    </>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExploreFoods;
