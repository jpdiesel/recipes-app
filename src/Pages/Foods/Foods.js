import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import FoodCard from '../../Components/FoodCard';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import context from '../../Context/Context';

const FOOD_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function Foods({ history }) {
  const { foodCard, setFoodCard, api, procurado } = useContext(context);

  useEffect(() => {
    (async () => {
      const { meals } = await api(FOOD_API);
      setFoodCard(meals);
    })();
  }, [setFoodCard, api]);
  return (
    <div>
      <Header history={ history } title="Foods" showSearchButton />
      { foodCard.length > 1 && !procurado
        ? (
          <FoodCard foods={ foodCard } />
        )
        : (
          <p>Carregando...</p>
        )}
      <Footer history={ history } />
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Foods;
