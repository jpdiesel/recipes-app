import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '../Context/Context';

function SearchCard({ history }) {
  const { result } = useContext(context);
  const { meals } = result;
  const { drinks } = result;
  // if (meals) console.log(meals[0].idMeal);
  const MAX_RESULTS = 12;
  const mealResults = () => (
    <div>
      {meals.length === 1 ? history.push(`/foods/${meals[0].idMeal}`) : null}
      {meals.slice(0, MAX_RESULTS).map((meal, index) => (
        <Link to={ `/foods/${meal.idMeal}` } key={ meal.idMeal }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
              className="imagem"
            />
            <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
          </div>
        </Link>
      ))}
    </div>);
  const drinkResults = () => (
    <div>
      {drinks.length === 1 ? history.push(`/drinks/${drinks[0].idDrink}`) : null}
      {drinks.slice(0, MAX_RESULTS).map((drink, index) => (
        <Link to={ `/drinks/${drink.idDrink}` } key={ drink.idDrink }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
              className="imagem"
            />
            <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div>
      {meals ? mealResults()
        : null }
      {drinks ? drinkResults()
        : null }
    </div>

  );
}

SearchCard.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.func,
    pathname: PropTypes.func,
  }),
}.isRequired;

export default SearchCard;
