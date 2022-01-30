import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../Components/Footer';
import Header from '../../../Components/Header';
import context from '../../../Context/Context';
import { randomDrinksApi } from '../../../services/apis';

function ExploreDrinks({ history }) {
  const { randomDrink, setRandomDrink } = useContext(context);
  useEffect(() => {
    (async () => {
      const { drinks } = await randomDrinksApi();
      setRandomDrink(drinks);
    })();
  }, [setRandomDrink]);
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
      { randomDrink.length === 1
        ? (
          <Link to={ `/drinks/${randomDrink[0].idDrink}` }>
            <button
              type="button"
              data-testid="explore-surprise"
            >
              Surprise me!
            </button>
          </Link>)
        : (
          null
        )}

      <Footer history={ history } />
    </>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExploreDrinks;
