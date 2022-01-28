import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../Components/Footer';

function ExFoodsIngredients({ history }) {
  return (
    <>
      <h1>ExploreFoodsIngredients</h1>
      <Footer history={ history } />
    </>
  );
}

ExFoodsIngredients.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExFoodsIngredients;
