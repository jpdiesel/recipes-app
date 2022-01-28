import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../../../Components/Footer';
import Header from '../../../../Components/Header';

function ExFoodsIngredients({ history }) {
  return (
    <>
      <Header
        history={ history }
        title="Explore Ingredients"
        showSearchButton={ false }
      />
      <Footer history={ history } />
    </>
  );
}

ExFoodsIngredients.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExFoodsIngredients;
