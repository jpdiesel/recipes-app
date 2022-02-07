import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../../../Context/Context';
import './button.css';

function Button({ id, pagina }) {
  const { selecionado, verificaCheck } = useContext(context);
  const [incompleto, setIncompleto] = useState(false);
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
    if (selecionado) {
      setIncompleto(true);
    }
  }, [selecionado]);

  return (
    <div>
      {
        !completoDrink
          ? (
            <Link
              to={ `/${pagina}/${id}/in-progress` }
            >
              <button
                className="start-recipe"
                type="button"
                data-testid="start-recipe-btn"
              >
                {incompleto ? 'Continue Recipe' : 'Start Recipe'}
              </button>
            </Link>
          )
          : null
      }
    </div>

  );
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  pagina: PropTypes.string.isRequired,
};

export default Button;
