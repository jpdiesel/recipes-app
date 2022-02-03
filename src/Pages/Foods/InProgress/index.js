import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import context from '../../../Context/Context';
import favoritesDetails from '../../../Functions/remove';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';

function InProgressFoods({ history }) {
  const [response, setResponse] = useState([]);
  const [copiedkLink, setCopiedkLink] = useState(false);
  const {
    api,
    favoritedFood,
    setFavoritedFood,
    validacao,
  } = useContext(context);

  // pegar id do URL
  const { pathname } = history.location;
  const FIXO = 6;
  const id = pathname.substring(pathname.lastIndexOf('foods/') + FIXO).split('/')[0];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}/in-progress`);
    setCopiedkLink(true);
  };

  const favorite = () => {
    if (favoritedFood) {
      setFavoritedFood(false);
      favoritesDetails('removeFoods', response);
    } else {
      setFavoritedFood(true);
      favoritesDetails('foods', response);
    }
  };

  useEffect(() => {
    (async () => {
      // pegar dados da API
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      console.log(URL);
      const { meals } = await api(URL);
      setResponse(meals[0]);
    })();
  }, []);

  useEffect(() => {
    validacao('foods', response);
  }, [response]);

  return (
    <div>
      {response
        ? (
          <>
            {/* Titulo e Categoria */}
            <h3 data-testid="recipe-title">{response.strMeal}</h3>
            <h5 data-testid="recipe-category">{response.strCategory}</h5>
            <img src={ response.strMealThumb } alt="foto" data-testid="recipe-photo" />
            {/* Botão de compartilhar */}
            <button
              type="button"
              data-testid="share-btn"
              src={ shareIcon }
              onClick={ () => copyToClipboard() }
            >
              <span className="spanCopy">
                <img src={ shareIcon } alt="Compartilhar" className="imgCopy" />
                { copiedkLink ? <p className="pCopy">Link copied!</p> : null }
              </span>
            </button>
            {/* Botão de Favoritar */}
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
            {/* Lista de igredientes */}
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
          </>
        ) : null}
    </div>
  );
}

InProgressFoods.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.func,
  }).isRequired,
};

export default InProgressFoods;
