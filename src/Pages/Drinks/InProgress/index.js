import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import context from '../../../Context/Context';

function InProgressDrinks({ history }) {
  const [response, setResponse] = useState([]);
  const { api } = useContext(context);

  useEffect(() => {
    (async () => {
      // pegar id do URL
      const { pathname } = history.location;
      const FIXO = 7;
      const id = pathname.substring(pathname.lastIndexOf('drinks/') + FIXO).split('/')[0];
      // pegar dados da API
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      console.log(URL);
      const { drinks } = await api(URL);
      setResponse(drinks[0]);
    })();
  }, []);

  return (
    <div>
      <p>InProgressDrinks</p>
      {response ? <h3>{response.strDrink}</h3> : null}
    </div>
  );
}

InProgressDrinks.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.func,
  }).isRequired,
};

export default InProgressDrinks;
