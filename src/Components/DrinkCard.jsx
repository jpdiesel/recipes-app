import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import context from '../Context/Context';

const DRINK_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINK_MAX_RESULT = 12;
const CATEGORIES_MAX_RESULT = 5;

export default function DrinkCard({ cocktails }) {
  const {
    drinkCategories,
    setDrinkCategories,
    api,
    setSearchDrinkCategories,
    searchDrinkCategories,
    setToggleSearchDrinkCat,
    toggleSearchDrinkCat,
    changeDrinkCategory,
    setChangeDrinkCategory,
    // setDrinksDetails,
  } = useContext(context);

  useEffect(() => {
    (async () => {
      const { drinks } = await api(DRINK_CATEGORIES);
      setDrinkCategories(drinks);
    })();
  }, []);

  const searchCategories = async (category) => {
    setChangeDrinkCategory(category);
    if (toggleSearchDrinkCat && changeDrinkCategory === category) {
      setToggleSearchDrinkCat(false);
    } else {
      setToggleSearchDrinkCat(true);
      const CATEGORY_API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const { drinks } = await api(CATEGORY_API);
      setSearchDrinkCategories(drinks);
    }
  };

  // const saveDetails = () => {

  // };

  const allCategories = () => {
    setToggleSearchDrinkCat(false);
  };
  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => allCategories() }
      >
        All
      </button>
      { drinkCategories.slice(0, CATEGORIES_MAX_RESULT).map((drink, index) => (
        <button
          type="button"
          data-testid={ `${drink.strCategory}-category-filter` }
          key={ index }
          onClick={ () => searchCategories(drink.strCategory) }
        >
          { drink.strCategory }
        </button>
      )) }
      {
        searchDrinkCategories.length > 1 && toggleSearchDrinkCat
          ? (
            searchDrinkCategories.slice(0, DRINK_MAX_RESULT).map((drink, index) => (
              <Link key={ index } to={ `/drinks/${drink.idDrink}` }>
                <div data-testid={ `${index}-recipe-card` } key={ index }>
                  <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
                  <img
                    key={ index }
                    data-testid={ `${index}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                </div>
              </Link>
            ))
          )
          : (
            cocktails.slice(0, DRINK_MAX_RESULT).map((drink, index) => (
              <Link key={ index } to={ `/drinks/${drink.idDrink}` }>
                <div
                  data-testid={ `${index}-recipe-card` }
                  key={ index }
                >
                  <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                </div>
              </Link>
            ))
          )
      }
    </div>
  );
}

DrinkCard.propTypes = {
  cocktails: PropTypes.shape({
    slice: PropTypes.func,
  }).isRequired,
};
