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
  const [foodIngredientSearch, setFoodIngredientSearch] = useState('');
  const [drinkIngredientSearch, setDrinkIngredientSearch] = useState('');
  const [changeFoodCategory, setChangeFoodCategory] = useState('');
  const [changeDrinkCategory, setChangeDrinkCategory] = useState('');
  const [randomDrink, setRandomDrink] = useState([]);
  const [randomFood, setRandomFood] = useState([]);
  const [update, setUpdate] = useState(false);
  const [procurado, setProcurado] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const [foodDetails, setFoodDetails] = useState([]);
  const [drinksDetails, setDrinksDetails] = useState([]);

  const [ingredients, setIngredients] = useState('');
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

  const listIngredients = (revenue) => {
    const igredientes = Object.keys(revenue)
      .filter((atual) => atual.includes('strIngredient'));

    let ingredient = [];

    for (let i = 0; i < igredientes.length; i += 1) {
      const atual = `strIngredient${i + 1}`;
      const medidas = `strMeasure${i + 1}`;
      const juntos = `${revenue[atual]} ${revenue[medidas]}`;

      if (revenue[atual] && revenue[medidas]) {
        ingredient = [...ingredient, juntos];
      } else if (revenue[atual]) {
        ingredient = [...ingredient, revenue[atual]];
      } else if (revenue[medidas]) {
        ingredient = [...ingredient, revenue[medidas]];
      }
    }
    const filtrado = ingredient.filter((atual) => (
      atual !== ' '
    ));
    setIngredients(filtrado);
  };

  const foods = (apiNew) => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const { idMeal, strMeal, strCategory, strMealThumb, strArea } = apiNew;

    if (local) {
      const salvar = [...local, {
        id: idMeal,
        type: 'food',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }];

      localStorage.setItem('favoriteRecipes', JSON.stringify(salvar));
    } else {
      const salvar = [{
        id: idMeal,
        type: 'food',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }];

      localStorage.setItem('favoriteRecipes', JSON.stringify(salvar));
    }
  };

  const favoriteDetails = (fonte, apiNew) => {
    if (fonte === 'drinks') {
      const local = JSON.parse(localStorage.getItem('favoriteRecipes'));

      console.log('cheguei');

      const {
        idDrink,
        strDrinkThumb,
        strCategory,
        strDrink,
        strAlcoholic,
      } = apiNew;

      if (local) {
        const salvar = [...local, {
          id: idDrink,
          type: 'drink',
          nationality: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        }];

        localStorage.setItem('favoriteRecipes', JSON.stringify(salvar));
      } else {
        const salvar = [{
          id: idDrink,
          type: 'drink',
          nationality: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        }];

        localStorage.setItem('favoriteRecipes', JSON.stringify(salvar));
      }
    } else if (fonte === 'foods') {
      foods(apiNew);
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
    foodIngredientSearch,
    setFoodIngredientSearch,
    drinkIngredientSearch,
    setDrinkIngredientSearch,
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
    listIngredients,
    ingredients,
    favoriteDetails,
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
