import PropTypes from 'prop-types';
import React, { useState } from 'react';
import context from '../Context/Context';

function Provider({ children }) {
  const [showInput, setShowInput] = useState(false);
  const [result, setResult] = useState('');
  const [foodCard, setFoodCard] = useState([]);
  const [drinkCard, setDrinkCard] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [searchFoodCategories, setSearchFoodCategories] = useState([]);
  const [searchDrinkCategories, setSearchDrinkCategories] = useState([]);
  const [foodsIngredients, setFoodsIngredients] = useState([]);
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const [toggleSearchFoodCat, setToggleSearchFoodCat] = useState(false);
  const [toggleSearchDrinkCat, setToggleSearchDrinkCat] = useState(false);
  const [changeFoodCategory, setChangeFoodCategory] = useState('');
  const [changeDrinkCategory, setChangeDrinkCategory] = useState('');
  const [randomDrink, setRandomDrink] = useState([]);
  const [randomFood, setRandomFood] = useState([]);
  const [update, setUpdate] = useState(false);
  const [procurado, setProcurado] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [foodDetails, setFoodDetails] = useState('');
  const [drinksDetails, setDrinksDetails] = useState('');
  const errorMessage = 'Sorry, we haven\'t found any recipes for these filters.';

  const handleData = (data) => {
    if (!data.length) {
      global.alert(errorMessage);
    }
    setResult(data);
  };

  const api = (url, input) => {
    try {
      const apiFetch = fetch(url);
      const json = apiFetch.then((response) => response.json());
      if (input) {
        json.then((data) => handleData(data));
      } else {
        return json;
      }
    } catch {
      global.alert(errorMessage);
    }
  };

  const contextValue = {
    showInput,
    setShowInput,
    setResult,
    api,
    setRandomDrink,
    setRandomFood,
    foodCard,
    setFoodCard,
    drinkCard,
    setDrinkCard,
    randomDrink,
    randomFood,
    foodCategories,
    setFoodCategories,
    drinkCategories,
    setDrinkCategories,
    searchDrinkCategories,
    searchFoodCategories,
    setSearchDrinkCategories,
    setSearchFoodCategories,
    toggleSearchFoodCat,
    setToggleSearchFoodCat,
    foodsIngredients,
    setFoodsIngredients,
    drinksIngredients,
    setDrinksIngredients,
    toggleSearchDrinkCat,
    setToggleSearchDrinkCat,
    changeFoodCategory,
    setChangeFoodCategory,
    changeDrinkCategory,
    setChangeDrinkCategory,
    update,
    setUpdate,
    result,
    errorMessage,
    procurado,
    setProcurado,
    searchInput,
    setSearchInput,
    foodDetails,
    setFoodDetails,
    drinksDetails,
    setDrinksDetails,
  };
  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
