import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import context from '../../Context/Context';
import favoritesDetails from '../../Functions/remove';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Button from './buttons/Button';
import './FoodDetails.css';

export default function FoodDetails({ history }) {
  const {
    foodDetails,
    api,
    setFoodDetails,
    ingredients,
    listIngredients,
    validacao,
    favoritedFood,
    setFavoritedFood,
    copyToClipboard,
    copiedFoodLink,
  } = useContext(context);

  const [drinkRecommended, setDrinkRecommended] = useState([]);

  // API para retornar as bebidas recomendadas
  useEffect(() => {
    (async () => {
      const NU = 6;
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const retorno = await api(URL);
      setDrinkRecommended(retorno.drinks.slice(0, NU));
    })();
  }, []);

  const details = () => {
    const {
      strMeal,
      strMealThumb,
      strInstructions,
      strCategory,
      strVideo,
      idMeal,
    } = foodDetails;

    const favorite = () => {
      if (favoritedFood) {
        setFavoritedFood(false);
        favoritesDetails('removeFoods', foodDetails);
      } else {
        setFavoritedFood(true);
        favoritesDetails('foods', foodDetails);
      }
    };

    return (
      <div>
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
        <button
          type="button"
          data-testid="share-btn"
          src={ shareIcon }
          onClick={ () => copyToClipboard(idMeal) }
        >
          <span className="spanCopy">
            <img src={ shareIcon } alt="Compartilhar" className="imgCopy" />
            { copiedFoodLink ? <p className="pCopy">Link copied!</p> : null }
          </span>
        </button>

        { favoritedFood
          ? (
            <button
              type="button"
              data-testid="favorite-btn"
              src={ blackHeartIcon }
              onClick={ () => favorite() }
            >
              <img src={ blackHeartIcon } alt="Favoritar" />
            </button>
          )
          : (
            <button
              type="button"
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              onClick={ () => favorite() }
            >
              <img src={ whiteHeartIcon } alt="Favoritar" />
            </button>
          )}
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
        </ul>

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

        <section>
          {drinkRecommended && drinkRecommended.map((atual, index) => (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <p data-testid={ `${index}-recomendation-title` }>{atual.strDrink}</p>
              <img src={ atual.strDrinkThumb } alt="Favoritar" />
            </div>
          ))}
        </section>
        <Button id={ idMeal } pagina="foods" ingredients={ ingredients } />
      </div>);
  };

  useEffect(() => {
    (async () => {
      const { pathname } = history.location;
      const lastItem = pathname.substring(pathname.lastIndexOf('/') + 1);
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${lastItem}`;
      listIngredients(foodDetails);
      if (!foodDetails) {
        const { meals } = await api(URL);
        setFoodDetails(meals[0]);
        listIngredients(meals[0]);
      }
    })();
  }, []);

  useEffect(() => {
    validacao('foods', foodDetails);
  }, [foodDetails]);

  return (
    <div>
      {
        foodDetails ? details() : (<p>Carregando</p>)
      }
    </div>
  );
}

FoodDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.func,
  }).isRequired,
};
