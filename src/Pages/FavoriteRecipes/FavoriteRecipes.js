import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Components/Header';

function FavoriteRecipes({ history }) {
  return (
    <div>
      <Header history={ history } title="Favorite Recipes" showSearchButton={ false } />
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default FavoriteRecipes;
