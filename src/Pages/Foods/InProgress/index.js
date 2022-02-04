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
    ingredients,
    listIngredients,
  } = useContext(context);

  // pegar id do URL
  const { pathname } = history.location;
  const FIXO = 6;
  const id = pathname.substring(pathname.lastIndexOf('foods/') + FIXO).split('/')[0];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
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

  const concluido = () => {
    const { strMeal, strCategory, strMealThumb, strArea, strTags } = response;

    // busca a data atual no site: https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;

    // Pega informações do localStorege
    const local = JSON.parse(localStorage.getItem('doneRecipes'));

    const atual = {
      id,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
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

  useEffect(() => {
    // verificar se ta favorito
    validacao('foods', response);
    // atualiza a lista de igredientes
    listIngredients(response);
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
                    value={ atual }
                    id={ `Imput-${index}` }

                  />
                  { atual }
                </label>
              )) : null}
            </div>
            {/* Instruções */}
            <p data-testid="instructions">{response.strInstructions}</p>
          </>
        ) : null}
      {/* Botão de finalizar receita */}
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="finish-recipe"
        // src={ whiteHeartIcon }
        onClick={ () => concluido() }
      >
        Finish Recipe
      </button>
    </div>
  );
}

InProgressFoods.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
};

export default InProgressFoods;
