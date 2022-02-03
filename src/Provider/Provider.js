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
  const [favoritedDrink, setFavoritedDrink] = useState(false);
  const [favoritedFood, setFavoritedFood] = useState(false);
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

  const validacao = (fonte, receitaAtual) => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (fonte === 'drinks' && local) {
      const validaçãoOn = local.filter((atual) => receitaAtual.idDrink === atual.id);

      if (validaçãoOn.length >= 1) {
        setFavoritedDrink(true);
      } else { setFavoritedDrink(false); }
    } else if (fonte === 'foods' && local) {
      const validaçãoOn = local.filter((atual) => receitaAtual.idMeal === atual.id);

      if (validaçãoOn.length >= 1) {
        setFavoritedFood(true);
      } else { setFavoritedFood(false); }
    }
  };
  const [copiedFoodLink, setFoodCopiedLink] = useState(false);

  const copyToClipboard = (idMeal) => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${idMeal}`);
    setFoodCopiedLink(true);
  };

  const contextValue = {
    copyToClipboard,
    copiedFoodLink,
    setFoodCopiedLink,
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
    favoritedDrink,
    setFavoritedDrink,
    validacao,
    favoritedFood,
    setFavoritedFood,
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
