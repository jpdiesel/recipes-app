import React, { useContext } from 'react';

function SearchBar() {
  return (
    <form>
      <label htmlFor="c1">
        <input
          type="radio"
          id="c1"
          name="ingredient-search"
          value=""
          data-testid="ingredient-search-radio"
        />
        Ingredient

      </label>
    <label htmlFor="c2">
      <input
        type="radio"
        id="c2"
        name="name-search"
        value=""
        data-testid="name-search-radio"
      />
      Name</label>
      <input
        type="radio"
        id="c3"
        name="first-letter-search"
        value=""
        data-testid="first-letter-search-radio"
      />
      <label htmlFor="c3">Firt Letter</label>
      <button type="button " data-testid="exec-search-btn">Submit</button>
    </form>
  );
}

export default SearchBar;
