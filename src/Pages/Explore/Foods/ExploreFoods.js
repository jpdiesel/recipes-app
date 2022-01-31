import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../Components/Footer';
import Header from '../../../Components/Header';
import context from '../../../Context/Context';

const RANDOM_FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

function ExploreFoods({ history }) {
  const { randomFood, setRandomFood, api, update, setUpdate } = useContext(context);
  useEffect(() => {
    (async () => {
      const { meals } = await api(RANDOM_FOOD_URL);
      setRandomFood(meals);
    })();
  }, []);

  return (
    <>
      <Header history={ history } title="Explore Foods" />
      <Link to="/explore/foods/ingredients">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => setUpdate(!update) }
        >
          By Ingredient
        </button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => setUpdate(!update) }
        >
          By Nationality
        </button>
      </Link>
      { randomFood.length === 1
        ? (
          <Link to={ `/foods/${randomFood[0].idMeal}` }>
            <button
              type="button"
              data-testid="explore-surprise"
              onClick={ () => setUpdate(!update) }
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

ExploreFoods.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExploreFoods;
