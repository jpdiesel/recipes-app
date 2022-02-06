import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import context from '../../Context/Context';
import favoritesDetails from '../../Functions/remove';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Button from './buttons/Button';
import './DrinksDetails.css';

export default function DrinksDetails({ history }) {
  const [recommended, setRecommended] = useState([]);
  const [copiedDrinkLink, setCopiedDrinkLink] = useState(false);
  const {
    drinksDetails,
    api,
    setDrinksDetails,
    ingredients,
    listIngredients,
    favoritedDrink,
    setFavoritedDrink,
    validacao,
  } = useContext(context);

  // pegar id do URL
  const { pathname } = history.location;
  const FIXO = 1;
  const id = pathname.substring(pathname.lastIndexOf('/') + FIXO);

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
    } = drinksDetails;

    const copyToClipboard = () => {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${idDrink}`);
      setCopiedDrinkLink(true);
    };

    const favorite = () => {
      if (favoritedDrink) {
        setFavoritedDrink(false);
        favoritesDetails('removeDrinks', drinksDetails);
      } else {
        setFavoritedDrink(true);
        favoritesDetails('drinks', drinksDetails);
      }
    };

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
          <span className="spanCopy">
            <img src={ shareIcon } alt="Compartilhar" className="imgCopy" />
            { copiedDrinkLink ? <p className="pCopy">Link copied!</p> : null }
          </span>
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
          {ingredients ? ingredients.map((ingredient, index) => (

            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>

          )) : null }
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
        {/* {ingredients
          ? <Button id={ id } pagina="drinks" ingredients={ ingredients } />
          : null} */}
        <Button id={ id } pagina="drinks" ingredients={ ingredients } />
      </div>);
  };

  useEffect(() => {
    (async () => {
      // const { pathname } = history.location;
      const lastItem = pathname.substring(pathname.lastIndexOf('/') + 1);
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${lastItem}`;
      listIngredients(drinksDetails);
      if (!drinksDetails.length) {
        const { drinks } = await api(URL);
        setDrinksDetails(drinks[0]);
        listIngredients(drinks[0]);
      }
    })();
  }, []);

  useEffect(() => {
    validacao('drinks', drinksDetails);
  }, [drinksDetails]);

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
