import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import context from '../../../Context/Context';

function InProgressFoods({ history }) {
  const [response, setResponse] = useState([]);
  const { api } = useContext(context);

  useEffect(() => {
    (async () => {
      // pegar id do URL
      const { pathname } = history.location;
      const FIXO = 6;
      const id = pathname.substring(pathname.lastIndexOf('foods/') + FIXO).split('/')[0];
      // pegar dados da API
      const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      console.log(URL);
      const { meals } = await api(URL);
      setResponse(meals[0]);
    })();
  }, []);

  return (
    <div>
      <p>InProgressFoods</p>
      {response ? <h3>{response.strMeal}</h3> : null}
    </div>
  );
}

InProgressFoods.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.func,
  }).isRequired,
};

export default InProgressFoods;
