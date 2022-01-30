import PropTypes from 'prop-types';
import React, { useState } from 'react';
import context from '../Context/Context';

function Provider({ children }) {
  const [showInput, setShowInput] = useState(false);
  const [result, setResult] = useState('');
  const [randomDrink, setRandomDrink] = useState([]);
  const [randomFood, setRandomFood] = useState([]);
  const errorMessage = 'Sorry, we haven\'t found any recipes for these filters.';
  const handleData = (data) => {
    if (!data.length) {
      global.alert(errorMessage);
    }
    setResult(data);
  };

  const foodIngredientsAPI = async (input) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
    .then((response) => response.json()).then((data) => handleData(data))
    .catch(() => global.alert(errorMessage));
  const foodNamesAPI = async (input) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    .then((response) => response.json()).then((data) => handleData(data))
    .catch(() => global.alert(errorMessage));
  const firstLetterFoodAPI = async (input) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`)
    .then((response) => response.json()).then((data) => handleData(data))
    .catch(() => global.alert(errorMessage));
  const drinkNamesAPI = async (input) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
    .then((response) => response.json()).then((data) => handleData(data))
    .catch(() => global.alert(errorMessage));
  const drinkIngredientsAPI = async (input) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`)
    .then((response) => response.json()).then((data) => handleData(data))
    .catch(() => global.alert(errorMessage));
  const firstLetterDrinkAPI = async (input) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`)
    .then((response) => response.json()).then((data) => handleData(data))
    .catch(() => global.alert(errorMessage));
  const allFoodssAPI = async () => fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json()).then((data) => setResult(data))
    .catch(() => global.alert(errorMessage));

  const contextValue = {
    showInput,
    setShowInput,
    foodIngredientsAPI,
    foodNamesAPI,
    firstLetterFoodAPI,
    drinkIngredientsAPI,
    drinkNamesAPI,
    firstLetterDrinkAPI,
    allFoodssAPI,
    setRandomDrink,
    setRandomFood,
    randomDrink,
    randomFood,
    result,
    errorMessage,
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
