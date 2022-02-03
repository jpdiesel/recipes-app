const addDrinks = (apiNew) => {
  const local = JSON.parse(localStorage.getItem('favoriteRecipes'));

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
};

const addFoods = (apiNew) => {
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

const removerDrinks = (apiNew) => {
  const local = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const {
    idDrink,
    strDrinkThumb,
    strCategory,
    strDrink,
    strAlcoholic,
  } = apiNew;

  const salvo = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  const atual = local.filter((acc) => acc.id !== salvo.id);
  console.log(atual);

  localStorage.setItem('favoriteRecipes', JSON.stringify(atual));
};

const removerFoods = (apiNew) => {
  const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { idMeal, strMeal, strCategory, strMealThumb, strArea } = apiNew;

  const salvo = {
    id: idMeal,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  const atual = local.filter((acc) => acc.id !== salvo.id);

  localStorage.setItem('favoriteRecipes', JSON.stringify(atual));
};

const favoritesDetails = (fonte, api) => {
  if (fonte === 'drinks') {
    addDrinks(api);
  } else if (fonte === 'foods') {
    addFoods(api);
  } else if (fonte === 'removeDrinks') {
    removerDrinks(api);
  } else if (fonte === 'removeFoods') {
    removerFoods(api);
  }
};

export default favoritesDetails;
