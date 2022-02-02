import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Footer from '../../../../Components/Footer';
import Header from '../../../../Components/Header';
import IngredientCard from '../../../../Components/IngredientCard';
import context from '../../../../Context/Context';

const DRINKS_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

function ExDrinksIngredients({ history }) {
  const { drinksIngredients, setDrinksIngredients, api } = useContext(context);
  useEffect(() => {
    (async () => {
      const { drinks } = await api(DRINKS_INGREDIENTS);
      setDrinksIngredients(drinks);
    })();
  }, []);
  return (
    <>
      <Header
        history={ history }
        title="Explore Ingredients"
        showSearchButton={ false }
      />
      <IngredientCard cocktails={ (drinksIngredients || []) } />
      <Footer history={ history } />
    </>
  );
}

ExDrinksIngredients.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExDrinksIngredients;
