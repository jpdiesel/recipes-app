import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import context from '../Context/Context';

const DRINK_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINK_MAX_RESULT = 12;
const CATEGORIES_MAX_RESULT = 5;

export default function DrinkCard({ cocktails }) {
  const { drinkCategories, setDrinkCategories, api } = useContext(context);
  useEffect(() => {
    (async () => {
      const { drinks } = await api(DRINK_CATEGORIES);
      setDrinkCategories(drinks);
    })();
  }, [setDrinkCategories, api]);
  return (
    <div>
      { drinkCategories.slice(0, CATEGORIES_MAX_RESULT).map((drink, index) => (
        <button
          type="button"
          data-testid={ `${drink.strCategory}-category-filter` }
          key={ index }
          onClick
        >
          { drink.strCategory }
        </button>
      )) }
      { cocktails.slice(0, DRINK_MAX_RESULT).map((drink, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            className="imagem"
          />
        </div>
      )) }
    </div>
  );
}

DrinkCard.propTypes = {
  cocktails: PropTypes.shape({
    slice: PropTypes.func,
  }).isRequired,
};
