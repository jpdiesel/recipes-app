import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import context from '../Context/Context';

const FOOD_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const FOOD_MAX_RESULT = 12;
const CATEGORIES_MAX_RESULT = 5;

export default function FoodCard({ foods }) {
  const {
    foodCategories,
    setFoodCategories,
    api,
    searchFoodCategories,
    setSearchFoodCategories,
    toggleSearchFoodCat,
    setToggleSearchFoodCat,
    changeFoodCategory,
    setChangeFoodCategory,
    procurado,
    setProcurado,
    setFoodDetails,
  } = useContext(context);

  const searchCategories = async (category) => {
    setProcurado(false);
    setChangeFoodCategory(category);
    if (toggleSearchFoodCat && changeFoodCategory === category) {
      setToggleSearchFoodCat(false);
    } else {
      setToggleSearchFoodCat(true);
      const CATEGORY_API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const { meals } = await api(CATEGORY_API);
      setSearchFoodCategories(meals);
    }
  };

  const allCategories = () => {
    setToggleSearchFoodCat(false);
  };

  // const saveDetails = () => {

  // };

  useEffect(() => {
    (async () => {
      const { meals } = await api(FOOD_CATEGORIES);
      setFoodCategories(meals);
    })();
  }, []);

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => allCategories() }
      >
        All
      </button>
      { foodCategories.slice(0, CATEGORIES_MAX_RESULT).map((food, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${food.strCategory}-category-filter` }
          onClick={ () => searchCategories(food.strCategory) }
        >
          { food.strCategory }
        </button>
      )) }

      {/* tela dos itens */}

      { searchFoodCategories.length >= 1 && toggleSearchFoodCat && !procurado
        ? (
          searchFoodCategories.slice(0, FOOD_MAX_RESULT).map((food, index) => (
            <Link key={ index } to={ `/foods/${food.idMeal}` }>
              <div data-testid={ `${index}-recipe-card` } key={ index }>
                <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
                <img
                  key={ index }
                  data-testid={ `${index}-card-img` }
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                />
              </div>
            </Link>
          ))
        )
        : (
          foods.slice(0, FOOD_MAX_RESULT).map((food, index) => (
            <Link key={ index } to={ `/foods/${food.idMeal}` }>
              <div
                data-testid={ `${index}-recipe-card` }
                key={ index }
                role="button"
                onClick={ () => setFoodDetails(food) }
                onKeyPress={ () => setFoodDetails(food) }
                tabIndex={ index }
              >
                <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                />
              </div>
            </Link>
          )))}
    </div>
  );
}

FoodCard.propTypes = {
  foods: PropTypes.shape({
    slice: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
