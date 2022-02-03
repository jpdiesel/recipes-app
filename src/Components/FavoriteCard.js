import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '../Context/Context';
import blackFavoriteIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

export default function FavoriteCard({ index, favorite, handleUpdate }) {
  const { copyToClipboard, copiedFoodLink } = useContext(context);
  console.log(favorite);
  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredFavorites = favorites
      .filter((obj) => obj.id !== favorite.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavorites));
    handleUpdate();
  };

  const recipeLink = (type, id) => (`/${type}s/${id}`);
  return (
    <div className="card">
      <Link to={ () => recipeLink(favorite.type, favorite.id) }>
        <img
          src={ favorite.image }
          alt="share"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {favorite.type === 'food' ? `${favorite.nationality} - ${favorite.category}`
            : favorite.alcoholicOrNot }
        </p>
        <Link to={ () => recipeLink(favorite.type, favorite.id) }>
          <h2 data-testid={ `${index}-horizontal-name` }>{favorite.name}</h2>
        </Link>
        <button
          type="button"
          className="favorite-btn"
          onClick={ handleFavorite }
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            className="favorite-icon"
            src={ blackFavoriteIcon }
            alt="favorite icon"
          />
        </button>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          onClick={ () => copyToClipboard(favorite.id) }
        >
          <img src={ shareIcon } alt="Compartilhar" />
          { copiedFoodLink ? <p>Link copied!</p> : null }
        </button>
      </div>
      <div />
    </div>
  );
}

FavoriteCard.propTypes = {
  favorite: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};
