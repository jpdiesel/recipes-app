import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import context from '../../../Context/Context';

function ingredientsList({ ingredients }) {
  const { selecionado } = useContext(context);
  return (
    <div className="list-group">
      {ingredients.map((atual, index) => (
        <label
          key={ index }
          className="list-group-item"
          htmlFor={ `Imput-${index}` }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            className="form-check-input me-1"
            type="checkbox"
            value={ atual }
            id={ `Imput-${index}` }
            onChange={ (e) => favoritesDetails('drinksIngredients', e, id) }
            { ...selecionado ? 'checked' : null }
          />
          { atual }
        </label>
      ))}
    </div>
  );
}

ingredientsList.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Foods;
