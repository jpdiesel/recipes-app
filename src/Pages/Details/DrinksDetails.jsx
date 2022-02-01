import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import context from '../../Context/Context';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function DrinksDetails({ history }) {
  const { drinksDetails, api, setDrinksDetails } = useContext(context);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    (async () => {
      const NU = 6;
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const retorno = await api(URL);
      setRecommended(retorno.meals.slice(0, NU));
    })();
  }, []);

  const details = () => {
    const {
      strDrink,
      strDrinkThumb,
      strInstructions,
      strCategory,
      strVideo } = drinksDetails[0];

    let ingredient = [];

    const drinksDetailsKeys = Object.keys(drinksDetails[0])
      .filter((atual) => atual.includes('strIngredient'));

    for (let i = 0; i < drinksDetailsKeys.length; i += 1) {
      const atual = `strIngredient${i + 1}`;
      const medidas = `strMeasure${i + 1}`;
      const juntos = `${drinksDetails[0][atual]} ${drinksDetails[0][medidas]}`;

      if (drinksDetails[0][atual] && drinksDetails[0][medidas]) {
        ingredient = [...ingredient, juntos];
      } else if (drinksDetails[0][atual]) {
        ingredient = [...ingredient, drinksDetails[0][atual]];
      } else if (drinksDetails[0][medidas]) {
        ingredient = [...ingredient, drinksDetails[0][medidas]];
      }
    }

    return (
      <div>
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
        <button
          type="button"
          data-testid="share-btn"
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="Compartilhar" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
        >
          <img src={ whiteHeartIcon } alt="Favoritar" />
        </button>
        <p data-testid="recipe-category">{strCategory}</p>

        <ul>
          {ingredient.map((atual, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {atual}
            </li>
          ))}

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

        {recommended && recommended.map((atual, index) => (
          <div key={ index } data-testid={ `${index}-recomendation-card` }>
            <p>{atual.strMeal}</p>
            <img src={ atual.strMealThumb } alt="Favoritar" />
          </div>
        ))}

        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </div>);
  };

  useEffect(() => {
    (async () => {
      const { pathname } = history.location;
      const lastItem = pathname.substring(pathname.lastIndexOf('/') + 1);
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${lastItem}`;
      const { drinks } = await api(URL);
      setDrinksDetails(drinks);
      // details();
    })();
  }, []);

  return (
    <div>
      {
        drinksDetails ? details() : (<p>Carregando</p>)
      }
    </div>
  );
}

DrinksDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.func,
  }).isRequired,
};
