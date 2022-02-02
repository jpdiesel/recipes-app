import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '../Context/Context';

const MAX_RESULT = 12;

export default function IngredientCard({ cocktails, foods }) {
  const { setSearchDrinkCategories, setSearchFoodCategories, api } = useContext(context);
  const saveDrinkIngredients = async (drinkName) => {
    const D = `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast${drinkName}`;
    const { drinks } = await api(D);
    setSearchDrinkCategories(drinks);
  };
  const saveFoodIngredients = async (foodName) => {
    const FOOD = `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast${foodName}`;
    const { meals } = await api(FOOD);
    setSearchFoodCategories(meals);
  };
  return (
    <div>
      { cocktails && cocktails.length > 1
        ? (
          cocktails.slice(0, MAX_RESULT).map((drink, index) => (
            <Link to="/drinks" key={ index }>
              <div
                key={ index }
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => saveDrinkIngredients(drink.strIngredient1) }
                role="button"
                tabIndex={ index }
                onKeyPress={ () => saveDrinkIngredients(drink.strIngredient1) }
              >
                <p data-testid={ `${index}-card-name` }>{ drink.strIngredient1 }</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={
                    `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png`
                  }
                  alt={ drink.strIngredient1 }
                />
              </div>
            </Link>))
        )
        : (
          null
        )}
      { foods && foods.length > 1
        ? (
          foods.slice(0, MAX_RESULT).map((food, index) => (
            <Link to="/foods" key={ index }>
              <div
                key={ index }
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => saveFoodIngredients(food.strIngredient) }
                role="button"
                tabIndex={ index }
                onKeyPress={ () => saveFoodIngredients(food.strIngredient) }
              >
                <p data-testid={ `${index}-card-name` }>{ food.strIngredient }</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={
                    `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png`
                  }
                  alt={ food.strIngredient }
                />
              </div>
            </Link>
          ))
        )
        : (
          null
        )}
    </div>
  );
}

IngredientCard.propTypes = {
  cocktails: PropTypes.shape({}),
  foods: PropTypes.shape({}),
}.isRequired;
