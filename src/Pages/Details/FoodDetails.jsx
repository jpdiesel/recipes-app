import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../../Context/Context';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function FoodDetails({ history }) {
  const {
    foodDetails,
    api,
    setFoodDetails,
    ingredients,
    listIngredients,
  } = useContext(context);

  const [drinkRecommended, setDrinkRecommended] = useState([]);
  const [copiedFoodLink, setFoodCopiedLink] = useState(false);

  // API para retornar as bebidas recomendadas
  useEffect(() => {
    (async () => {
      const NU = 6;
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const retorno = await api(URL);
      setDrinkRecommended(retorno.drinks.slice(0, NU));
    })();
  }, []);

  const favoriteDetails = () => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const { idMeal, strMeal, strCategory, strMealThumb, strArea } = foodDetails[0];

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

  const details = () => {
    const {
      strMeal,
      strMealThumb,
      strInstructions,
      strCategory,
      strVideo,
      idMeal,
    } = foodDetails[0];

    const copyToClipboard = () => {
      navigator.clipboard.writeText(`http://localhost:3000/foods/${idMeal}`);
      setFoodCopiedLink(true);
    };

    return (
      <div>
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
        <button
          type="button"
          data-testid="share-btn"
          src={ shareIcon }
          onClick={ () => copyToClipboard() }
        >
          <img src={ shareIcon } alt="Compartilhar" />
          { copiedFoodLink ? <p>Link copied!</p> : null }
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          onClick={ () => favoriteDetails() }
        >
          <img src={ whiteHeartIcon } alt="Favoritar" />
        </button>
        <p data-testid="recipe-category">{strCategory}</p>

        <ul>
          {ingredients ? ingredients.map((atual, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {atual}
            </li>
          )) : null}

          <p data-testid="instructions">{strInstructions}</p>

          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ strVideo }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </ul>
        <section>
          {drinkRecommended && drinkRecommended.map((atual, index) => (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <p data-testid={ `${index}-recomendation-title` }>{atual.strDrink}</p>
              <img src={ atual.strDrinkThumb } alt="Favoritar" />
            </div>
          ))}
        </section>
        <Link to={ `/foods/${idMeal}/in-progress` }>
          <button
            className="start-recipe"
            type="button"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        </Link>
      </div>);
  };

  useEffect(() => {
    (async () => {
      const { pathname } = history.location;
      const lastItem = pathname.substring(pathname.lastIndexOf('/') + 1);
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${lastItem}`;
      const { meals } = await api(URL);
      setFoodDetails(meals);
      listIngredients(meals[0]);
    })();
  }, []);

  return (
    <div>
      {
        foodDetails.length >= 1 ? details() : (<p>Carregando</p>)
      }
    </div>
  );
}

FoodDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.func,
  }).isRequired,
};
