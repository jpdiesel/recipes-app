import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import FavoriteCard from '../../Components/FavoriteCard';
import Header from '../../Components/Header';

function FavoriteRecipes({ history }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [refreshFavorites, setRefreshFavorites] = useState(false);

  const handleUpdate = () => {
    setRefreshFavorites(!refreshFavorites);
  };
  const handleClick = (type) => {
    const results = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredFavoriteRecipes = type ? results
      .filter((fav) => fav.type === type) : results;
    setFavoriteRecipes(filteredFavoriteRecipes);
  };
  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(results);
  }, [refreshFavorites]);

  useEffect(() => {
    handleUpdate();
  }, []);
  console.log(favoriteRecipes);
  return (
    <div>
      <Header history={ history } title="Favorite Recipes" showSearchButton={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleClick() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleClick('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleClick('drink') }

      >
        Drinks
      </button>
      {
        favoriteRecipes
          ? favoriteRecipes.map((favorite, index) => (
            <FavoriteCard
              index={ index }
              key={ favorite.id }
              favorite={ favorite }
              refreshFavorites={ refreshFavorites }
              setFavoriteRecipes={ setFavoriteRecipes }
              handleUpdate={ handleUpdate }
            />
          ))
          : null
      }

    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default FavoriteRecipes;
