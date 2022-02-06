import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../../../Context/Context';
import './button.css';

function Button({ id, pagina, ingredients }) {
  const { selecionado, verificaCheck } = useContext(context);
  const [incompleto, setIncompleto] = useState(false);
  const [completo, setCompleto] = useState(false);
  const [completoDrink, setCompletoDrink] = useState(false);

  useEffect(() => {
    const pag = pagina === 'foods' ? 'meals' : 'cocktails';
    verificaCheck(id, pag);

    const local = JSON.parse(localStorage.getItem('doneRecipes'));

    if (local) {
      const verifica = local.filter((atual) => atual.id === id);
      if (verifica.length > 0) {
        setCompletoDrink(true);
      }
    }
  }, []);

  useEffect(() => {
    if (
      ingredients
      && selecionado
      && ingredients.length === selecionado.length
    ) {
      console.log('completo');
      setCompleto(true);
    } else if (selecionado) {
      setIncompleto(true);
    }
  }, [selecionado, id, ingredients]);

  return (
    <Link
      to={ `/${pagina}/${id}/in-progress` }
      className={ completo || completoDrink ? 'removerButton' : '' }
    >
      <button
        className="start-recipe"
        type="button"
        data-testid="start-recipe-btn"
      // onClick={ history.push(`/${pagina}/${id}/in-progress`) }
      >
        {incompleto ? 'Continue Recipe' : 'Start Recipe'}
        {/* Start Recipe */}
      </button>
    </Link>

  );
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  pagina: PropTypes.string.isRequired,
  ingredients: PropTypes.shape([]).isRequired,
};

export default Button;
