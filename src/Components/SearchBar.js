import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import context from '../Context/Context';
import SearchCard from './SearchCard';

function SearchBar({ title, searchInput }) {
  const [checked, setChecked] = useState('');
  const {
    foodIngredientsAPI,
    foodNamesAPI,
    firstLetterFoodAPI,
    drinkIngredientsAPI,
    drinkNamesAPI,
    firstLetterDrinkAPI,
  } = useContext(context);
  const handleClick = ({ target: { value } }) => {
    setChecked(value);
  };
  const handleSearch = () => {
    if (title === 'Foods') {
      switch (checked) {
      case 'ingredient':
        foodIngredientsAPI(searchInput);
        break;
      case 'name':
        foodNamesAPI(searchInput);
        break;
      case 'letter':
        if (searchInput.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        }
        firstLetterFoodAPI(searchInput);
        break;
      default:
        console.log('Default');
      }
    }
    if (title === 'Drinks') {
      switch (checked) {
      case 'ingredient':
        drinkIngredientsAPI(searchInput);
        break;
      case 'name':
        drinkNamesAPI(searchInput);
        break;
      case 'letter':
        if (searchInput.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        }
        firstLetterDrinkAPI(searchInput);
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
        <SearchCard />
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SearchBar;
