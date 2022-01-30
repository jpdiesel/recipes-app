import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import context from '../Context/Context';

const FOOD_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const FOOD_MAX_RESULT = 12;
const CATEGORIES_MAX_RESULT = 5;

export default function FoodCard({ foods }) {
  const { categories, setCategories, api } = useContext(context);
  useEffect(() => {
    (async () => {
      const { meals } = await api(FOOD_CATEGORIES);
      setCategories(meals);
    })();
  }, [setCategories, api]);
  return (
    <div>
      { categories.slice(0, CATEGORIES_MAX_RESULT).map((food, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${food.strCategory}-category-filter` }
        >
          { food.strCategory }
        </button>
      )) }
      { foods.slice(0, FOOD_MAX_RESULT).map((food, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ food.strMealThumb }
            alt={ food.strMeal }
          />
        </div>
      )) }
    </div>
  );
}

FoodCard.propTypes = {
  foods: PropTypes.shape({
    slice: PropTypes.func,
  }).isRequired,
};
