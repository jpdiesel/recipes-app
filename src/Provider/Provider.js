import PropTypes from 'prop-types';
import React, { useState } from 'react';
import context from '../Context/Context';

function Provider({ children }) {
  const [showInput, setShowInput] = useState(false);
  const [result, setResult] = useState('');
  const [foodCard, setFoodCard] = useState([]);
  const [drinkCard, setDrinkCard] = useState([]);
  const [categories, setCategories] = useState([]);
  const [randomDrink, setRandomDrink] = useState([]);
  const [randomFood, setRandomFood] = useState([]);
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
    categories,
    setCategories,
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
