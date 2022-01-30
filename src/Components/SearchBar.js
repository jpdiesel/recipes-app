import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import context from '../Context/Context';
import SearchCard from './SearchCard';

function SearchBar({ history, title, searchInput }) {
  const FOOD_INGREDIENTS = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
  const FOOD_NAMES = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
  const FIRST_LETTER_FOOD = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
  const DRINK_INGREDIENTS = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
  const DRINK_NAMES = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
  const FIRST_LETTER_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;

  const [checked, setChecked] = useState('');
  const {
    api,
  //   drinkIngredientsAPI,
  //   drinkNamesAPI,
  //   firstLetterDrinkAPI,
  } = useContext(context);
  const handleClick = ({ target: { value } }) => {
    setChecked(value);
  };
  const handleSearch = () => {
    if (title === 'Foods') {
      switch (checked) {
      case 'ingredient':
        api(FOOD_INGREDIENTS, searchInput);
        break;
      case 'name':
        api(FOOD_NAMES, searchInput);
        break;
      case 'letter':
        if (searchInput.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        }
        api(FIRST_LETTER_FOOD, searchInput);
        break;
      default:
        console.log('Default');
      }
    }
    if (title === 'Drinks') {
      switch (checked) {
      case 'ingredient':
        api(DRINK_INGREDIENTS, searchInput);
        break;
      case 'name':
        api(DRINK_NAMES, searchInput);
        break;
      case 'letter':
        if (searchInput.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        }
        api(FIRST_LETTER_DRINKS, searchInput);
        break;
      default:
        console.log('Default');
      }
    }
  };
  return (
    <form>
      <div>
        <label htmlFor="c1">
          <input
            type="radio"
            id="c1"
            name="search-bar"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onClick={ handleClick }
          />
          Ingredient
        </label>
        <label htmlFor="c2">
          <input
            type="radio"
            id="c2"
            name="search-bar"
            value="name"
            data-testid="name-search-radio"
            onClick={ handleClick }

          />
          Name
        </label>
        <label htmlFor="c3">
          <input
            type="radio"
            id="c3"
            name="search-bar"
            value="letter"
            data-testid="first-letter-search-radio"
            onClick={ handleClick }

          />
          First Letter
        </label>
      </div>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearch }
        >
          Search
        </button>
        <SearchCard history={ history } />
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default SearchBar;
