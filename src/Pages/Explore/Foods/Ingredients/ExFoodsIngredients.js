import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Footer from '../../../../Components/Footer';
import Header from '../../../../Components/Header';
import IngredientCard from '../../../../Components/IngredientCard';
import context from '../../../../Context/Context';

const FOOD_INGREDIENTS = 'www.themealdb.com/api/json/v1/1/list.php?i=list';

function ExFoodsIngredients({ history }) {
  const { foodsIngredients, setFoodsIngredients, api } = useContext(context);
  useEffect(() => {
    (async () => {
      const { meals } = await api(FOOD_INGREDIENTS);
      setDrinksIngredients(meals);
    })();
  }, [api, setFoodsIngredients]);
  return (
    <>
      <Header
        history={ history }
        title="Explore Ingredients"
        showSearchButton={ false }
      />
      <IngredientCard foods={ foodsIngredients } />
      <Footer history={ history } />
    </>
  );
}

ExFoodsIngredients.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExFoodsIngredients;
