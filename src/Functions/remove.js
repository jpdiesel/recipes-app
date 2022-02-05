// Adiciona os bebidas como favorito
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

// Adiciona as comidas como favorito
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

// Remove as bebidas do favorito
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

  localStorage.setItem('favoriteRecipes', JSON.stringify(atual));
};

// Remove as comidas do favorito
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

const checkDrinks = ({ target }, id) => {
  const { checked, value } = target;
  let antigo = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (antigo && antigo.cocktails) {
    if (checked && !antigo.cocktails[id]) {
      antigo = { cocktails: { ...antigo.cocktails, [id]: [value] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(antigo));
    } else if (checked && antigo.cocktails[id]) {
      const feitos = [...antigo.cocktails[id], value];
      antigo = { cocktails: { ...antigo.cocktails, [id]: feitos } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(antigo));
    } else if (!checked) {
      const rew = antigo.cocktails[id].filter((atual) => atual !== value);
      antigo = { cocktails: { ...antigo.cocktails, [id]: rew } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(antigo));
    }
  } else if (checked) {
    antigo = { cocktails: { [id]: [value] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(antigo));
  }
};

// identifica o que a requisição quer fazer
const favoritesDetails = (fonte, api, id) => {
  if (fonte === 'drinks') {
    addDrinks(api);
  } else if (fonte === 'foods') {
    addFoods(api);
  } else if (fonte === 'removeDrinks') {
    removerDrinks(api);
  } else if (fonte === 'removeFoods') {
    removerFoods(api);
  } else if (fonte === 'drinksIngredients') {
    checkDrinks(api, id);
  }
};

export default favoritesDetails;
