import PropTypes from 'prop-types';
import React from 'react';

const MAX_RESULT = 12;

export default function IngredientCard({ drinks, foods }) {
  console.log(drinks, 'eu estou fora');
  return (
    <div>
      { drinks && drinks.length > 1
        ? (
          drinks.slice(0, MAX_RESULT).map((drink, index) => {
            console.log(drink, 'eu esotu dentro');
            return (
              <div key={ index } data-testid={ `${index}-ingredient-card` }>
                <p data-testid={ `${index}-card-name` }>{ drink.strIngredient1 }</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={
                    `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png`
                  }
                  alt={ drink.strIngredient1 }
                />
              </div>);
          })
        )
        : (
          null
        )}
      { foods && foods.length > 1
        ? (
          foods.slice(0, MAX_RESULT).map((food, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-card` }>
              <p data-testid={ `${index}-card-name` }>{ food.strIngredient }</p>
              <img
                data-testid={ `${index}-card-img` }
                src={
                  `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png`
                }
                alt={ food.strIngredient }
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
