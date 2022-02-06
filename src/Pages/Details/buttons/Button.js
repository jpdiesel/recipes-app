import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../../../Context/Context';
import './button.css';

function Button({ id, pagina, ingredients }) {
  const { selecionado, verificaCheck } = useContext(context);
  const [incompleto, setIncompleto] = useState(false);
  const [completo, setCompleto] = useState(false);

  useEffect(() => {
    const pag = pagina === 'foods' ? 'meals' : 'cocktails';

    verificaCheck(id, pag);
  }, []);

  useEffect(() => {
    console.log(ingredients);
    console.log(selecionado);
    if (ingredients && selecionado && ingredients.length === selecionado.length) {
      console.log('completo');
      setCompleto(true);
    } else if (selecionado) {
      setIncompleto(true);
    }
  }, [selecionado, id, ingredients]);

  return (
    <Link
      to={ `/${pagina}/${id}/in-progress` }
      className={ completo ? 'removerButton' : '' }
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
