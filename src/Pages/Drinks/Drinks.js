import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import DrinkCard from '../../Components/DrinkCard';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import context from '../../Context/Context';

const DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Drinks({ history }) {
  const { drinkCard, setDrinkCard, api } = useContext(context);
  useEffect(() => {
    (async () => {
      const { drinks } = await api(DRINK_API);
      setDrinkCard(drinks);
    })();
  }, [setDrinkCard, api]);
  return (
    <>
      <Header history={ history } title="Drinks" showSearchButton />
      { drinkCard.length > 1
        ? (
          <DrinkCard cocktails={ drinkCard } />
        )
        : (
          <p>Carregando...</p>
        )}
      <Footer history={ history } />
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Drinks;
