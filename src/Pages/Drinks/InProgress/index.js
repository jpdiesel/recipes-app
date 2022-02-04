import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import context from '../../../Context/Context';
import favoritesDetails from '../../../Functions/remove';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';

function InProgressDrinks({ history }) {
  const [response, setResponse] = useState([]);
  const [copiedkLink, setCopiedkLink] = useState(false);
  const {
    api,
    favoritedDrink,
    setFavoritedDrink,
    ingredients,
    validacao,
    listIngredients,
  } = useContext(context);

  // pegar id do URL
  const { pathname } = history.location;
  const FIXO = 7;
  const id = pathname.substring(pathname.lastIndexOf('drinks/') + FIXO).split('/')[0];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setCopiedkLink(true);
  };

  const favorite = () => {
    if (favoritedDrink) {
      setFavoritedDrink(false);
      favoritesDetails('removeDrinks', response);
    } else {
      setFavoritedDrink(true);
      favoritesDetails('drinks', response);
    }
  };

  useEffect(() => {
    (async () => {
      // pegar dados da API
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      console.log(URL);
      const { drinks } = await api(URL);
      setResponse(drinks[0]);
    })();
  }, []);

  useEffect(() => {
    // verificar se ta favorito
    validacao('drinks', response);
    // atualiza a lista de igredientes
    listIngredients(response);
  }, [response]);

  const concluido = () => {
    const { strCategory, strAlcoholic, strTags, strDrinkThumb, strDrink } = response;

    // busca a data atual: https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;

    // Pega informações do localStorege
    const local = JSON.parse(localStorage.getItem('doneRecipes'));

    const atual = {
      id,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: dataAtual,
      tags: [strTags],
    };

    if (local) {
      const novo = [...local, atual];
      localStorage.setItem('doneRecipes', JSON.stringify(novo));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([atual]));
    }

    history.push('/done-recipes');
  };

  return (
    <div>
      {response
        ? (
          <>
            {/* Titulo e Categoria */}
            <h3 data-testid="recipe-title">{response.strDrink}</h3>
            <h5 data-testid="recipe-category">{response.strCategory}</h5>
            <img src={ response.strDrinkThumb } alt="foto" data-testid="recipe-photo" />
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

            {/* Lista de igredientes */}
            <div className="list-group">
              {ingredients ? ingredients.map((atual, index) => (
                <label
                  key={ index }
                  className="list-group-item"
                  htmlFor={ `Imput-${index}` }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    value=""
                    id={ `Imput-${index}` }
                  />
                  { atual }
                </label>
              )) : null}
            </div>
            {/* Instruções */}
            <p data-testid="instructions">{response.strInstructionsIT}</p>
          </>
        ) : null}
      {/* Botão de finalizar receita */}
      <button
        type="button"
        className="finish-recipe"
        data-testid="finish-recipe-btn"
        // src={ whiteHeartIcon }
        onClick={ () => concluido() }
      >
        Finish Recipe
      </button>
    </div>
  );
}

InProgressDrinks.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
};

export default InProgressDrinks;
