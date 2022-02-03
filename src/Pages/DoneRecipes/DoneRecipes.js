import PropTypes from 'prop-types';
import React from 'react';
import Header from '../../Components/Header';

function DoneRecipes({ history }) {
  return (
    <div>
      <Header history={ history } title="Done Recipes" showSearchButton={ false } />
      <div> oi </div>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default DoneRecipes;
