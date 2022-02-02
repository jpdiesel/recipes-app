import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../../Context/Context';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './DrinksDetails.css';

export default function DrinksDetails({ history }) {
  const { drinksDetails, api, setDrinksDetails } = useContext(context);
  const [recommended, setRecommended] = useState([]);
  const [copiedDrinkLink, setCopiedDrinkLink] = useState(false);
  const [favoritedDrink, setFavoritedDrink] = useState(false);

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
      idDrink,
      strAlcoholic,
    } = drinksDetails[0];

    // const ingredient = ['batata', 'cenoura'];

    const copyToClipboard = () => {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${idDrink}`);
      setCopiedDrinkLink(true);
    };

    const favorite = () => {
      if (favoritedDrink) {
        setFavoritedDrink(true);
      } else {
        setFavoritedDrink(false);
      }
    };

    const ingredientKeys = Object.keys(drinksDetails[0])
      .filter((atual) => atual.includes('strIngredient'));

    const measureKeys = Object.keys(drinksDetails[0])
      .filter((atual) => atual.includes('strMeasure'));

    const ing = drinksDetails
      .map((drink) => ingredientKeys.map((keys) => drink[keys]));

    const measure = drinksDetails.map((drink) => measureKeys.map((keys) => drink[keys]));

    console.log(ing);
    console.log(measure);

    // for (let i = 0; i < drinksDetailsKeys.length; i += 1) {
    //   const atual = `strIngredient${i + 1}`;
    //   const medidas = `strMeasure${i + 1}`;
    //   const juntos = `${drinksDetails[0][atual]} ${drinksDetails[0][medidas]}`;

    //   if (drinksDetails[0][atual] && drinksDetails[0][medidas]) {
    //     ingredient = [...ingredient, juntos];
    //   } else if (drinksDetails[0][atual]) {
    //     ingredient = [...ingredient, drinksDetails[0][atual]];
    //   } else if (drinksDetails[0][medidas]) {
    //     ingredient = [...ingredient, drinksDetails[0][medidas]];
    //   }
    // }

    return (
      <div>
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
        <button
          type="button"
          data-testid="share-btn"
          src={ shareIcon }
          onClick={ () => copyToClipboard() }
        >
          <img src={ shareIcon } alt="Compartilhar" />
          { copiedDrinkLink ? <p>Link copied!</p> : null }
        </button>
        { favoritedDrink
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
        <p data-testid="recipe-category">{strAlcoholic}</p>

        <ul>
          {ing.map((ingredient, index) => measure.map((medida) => (
            ingredient && medida !== null
              ? (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${ingredient} - ${medida}`}
                </li>
              )
              : (
                null
              )
          )))}
        </ul>
        <p data-testid="instructions">{strInstructions}</p>
        <section>
          {recommended && recommended.map((atual, index) => (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <p data-testid={ `${index}-recomendation-title` }>{atual.strMeal}</p>
              <img src={ atual.strMealThumb } alt="Favoritar" />
            </div>
          ))}
        </section>
        <Link to={ `/drinks/${idDrink}/in-progress` }>
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
