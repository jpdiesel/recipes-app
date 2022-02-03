import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes({ history }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filterDoneRecipes, setFilterDoneRecipes] = useState('');
  const [doneRecipesCopiedLink, setDoneRecipesCopiedLink] = useState(false);

  useEffect(() => {
    const getAllDoneRecipes = JSON.parse(getLocalStorage('doneRecipes'));
    setDoneRecipes(getAllDoneRecipes);
  }, []);

  console.log(doneRecipes);

  const copyToClipboard = (type, id) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}/${id}`);
    setDoneRecipesCopiedLink(true);
  };

  return (
    <div>
      <Header history={ history } title="Done Recipes" showSearchButton={ false } />

      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterDoneRecipes('') }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilterDoneRecipes('food') }
      >
        Foods
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterDoneRecipes('drink') }
      >
        Drinks
      </button>

      {doneRecipes && doneRecipes
        .filter(({ type }) => type.includes(filterDoneRecipes))
        .map((item, index) => (
          <>
            <Link to={ `/${item.type}s/${item.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ item.image }
                alt="img"
              />
            </Link>

            <p data-testid={ `${index}-horizontal-top-text` }>
              {item.alcoholicOrNot
                ? (`${item.nationality} - ${item.category} - ${item.alcoholicOrNot}`)
                : (`${item.nationality} - ${item.category}`) }
            </p>

            <Link to={ `/${item.type}s/${item.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>
                { `${item.name}` }
              </p>
            </Link>

            <p data-testid={ `${index}-horizontal-done-date` }>
              { item.doneDate }
            </p>

            {item.tags && item.tags
              .map((tags) => (
                <p
                  key={ tags }
                  data-testid={ `${index}-${tags}-horizontal-tag` }
                >
                  {tags}
                </p>))}

            {doneRecipesCopiedLink && <p>Link copied!</p>}

            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => copyToClipboard(item.type, item.id) }
            >
              Compartilhar
            </button>
          </>
        ))}
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default DoneRecipes;
