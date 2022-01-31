import PropTypes from 'prop-types';
import React from 'react';

const MAX_RESULT = 12;

export default function IngredientCard({ drinks, foods }) {
  console.log(drinks);
  return (
    <div>
      { drinks > 1
        ? (
          drinks.slice(0, MAX_RESULT).map((drink, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-card` }>
              <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
            </div>
          ))
        )
        : (
          null
        )}
      { foods > 1
        ? (
          foods.slice(0, MAX_RESULT).map((food, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-card` }>
              <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strMealThumb }
                alt={ drink.strMeal }
              />
            </div>
          ))
        )
        : (
          null
        )}
    </div>
  );
}

IngredientCard.propTypes = {
  drinks: PropTypes.shape({}),
  foods: PropTypes.shape({}),
}.isRequired;
