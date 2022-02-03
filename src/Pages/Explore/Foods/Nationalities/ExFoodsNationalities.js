import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Footer from '../../../../Components/Footer';
import Header from '../../../../Components/Header';
import NationalityCard from '../../../../Components/NationalityCard';
import context from '../../../../Context/Context';

const FOOD_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function ExFooNationalities({ history }) {
  const { api, exFoodsNationalities, setExFoodsNationalities } = useContext(context);
  useEffect(() => {
    (async () => {
      const { meals } = await api(FOOD_API);
      setExFoodsNationalities(meals);
    })();
  }, []);
  return (
    <>
      <Header history={ history } title="Explore Nationalities" showSearchButton />
      <NationalityCard foods={ exFoodsNationalities } />
      <Footer history={ history } />
    </>
  );
}

ExFooNationalities.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExFooNationalities;
