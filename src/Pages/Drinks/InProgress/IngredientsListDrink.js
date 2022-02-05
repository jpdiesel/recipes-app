import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import context from '../../../Context/Context';
import favoritesDetails from '../../../Functions/remove';

function IngredientsListDrink({ ingredients, id }) {
  const { selecionado, verificaCheck } = useContext(context);
  const [select, setSelect] = useState('');

  const trabamento = () => {
    console.log('oi');
    console.log(ingredients);
    let desmarcado = ingredients;
    let tratadoMarc = [];

    if (selecionado) {
      for (let i = 0; i < selecionado.length; i += 1) {
        desmarcado = desmarcado.filter((atual) => atual !== selecionado[i]);
      }
      tratadoMarc = selecionado.map((atual) => ({ name: atual, status: true }));
    }
    const tratadoDes = desmarcado.map((atual) => ({ name: atual, status: false }));
    const fim = [...tratadoMarc, ...tratadoDes];
    setSelect(fim);
  };

  const selecao = (e) => {
    favoritesDetails('drinksIngredients', e, id);
    verificaCheck(id, 'cocktails');
  };

  useEffect(() => {
    trabamento();
  }, [ingredients, selecionado]);

  return (
    <div className="list-group">
      {select ? select.map(({ name, status }, index) => (
        <label
          key={ index }
          className="list-group-item"
          htmlFor={ `Imput-${index}` }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            className="form-check-input me-1"
            type="checkbox"
            value={ name }
            id={ `Imput-${index}` }
            onChange={ (e) => selecao(e) }
            checked={ status }
          />
          { name }
        </label>
      ))
        : ingredients.map((agora, index) => (
          <label
            key={ index }
            className="list-group-item"
            htmlFor={ `Imput-${index}` }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              className="form-check-input me-1"
              type="checkbox"
              value={ agora }
              id={ `Imput-${index}` }
              onChange={ (e) => selecao(e) }
            />
            { agora }
          </label>
        )) }
    </div>
  );
}

IngredientsListDrink.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
  ingredients: PropTypes.shape({
    map: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
  }).isRequired,
  // selecionado: PropTypes.shape({
  //   map: PropTypes.func.isRequired,
  // }).isRequired,
  id: PropTypes.string.isRequired,
};

export default IngredientsListDrink;
