import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import context from '../../../Context/Context';
import shareIcon from '../../../images/shareIcon.svg';

function InProgressFoods({ history }) {
  const [response, setResponse] = useState([]);
  const [copiedDrinkLink, setCopiedDrinkLink] = useState(false);
  const { api } = useContext(context);

  // pegar id do URL
  const { pathname } = history.location;
  const FIXO = 6;
  const id = pathname.substring(pathname.lastIndexOf('foods/') + FIXO).split('/')[0];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}/in-progress`);
    setCopiedDrinkLink(true);
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

  return (
    <div>
      <p>InProgressFoods</p>
      {response
        ? (
          <div>
            <h3 data-testid="recipe-title">{response.strMeal}</h3>
            <img src={ response.strMealThumb } alt="foto" data-testid="recipe-photo" />

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
          </div>
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
