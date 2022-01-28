import PropTypes from 'prop-types';
import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer({ history }) {
  return (
    <footer data-testid="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => (history.push('/drinks')) }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="bebidas" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explore') }
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="exploração" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => (history.push('/foods')) }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="comidas" />
      </button>
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Footer;
