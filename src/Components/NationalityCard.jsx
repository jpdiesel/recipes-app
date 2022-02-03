import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../Context/Context';

const FOOD_MAX_RESULT = 12;

export default function NationalityCard({ foods }) {
  const { api } = useContext(context);
  const [nationalities, setNationalities] = useState([]);
  const [searchNat, setSearchNat] = useState([]);

  useEffect(() => {
    (async () => {
      const MEALS_NATIONALITIES = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const { meals } = await api(MEALS_NATIONALITIES);
      setNationalities(meals);
    })();
  }, []);

  const searchFoodNationality = async (nationality) => {
    if (nationality !== 'All') {
      const SEARCH_MEALS_NATION = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`;
      const { meals } = await api(SEARCH_MEALS_NATION);
      setSearchNat(meals);
    } else {
      setSearchNat([]);
    }
  };

  return (
    <div>
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target }) => searchFoodNationality(target.value) }
      >
        <option
          data-testid="All-option"
          value="All"
        >
          All
        </option>
        { nationalities
          ? (
            nationalities.map((nation, index) => (
              <option
                key={ index }
                data-testid={ `${nation.strArea}-option` }
                value={ nation.strArea }
              >
                { nation.strArea }
              </option>
            ))
          )
          : (
            null
          ) }
      </select>
      { searchNat.length >= 1
        ? (
          searchNat.slice(0, FOOD_MAX_RESULT).map((food, index) => (
            <Link key={ index } to={ `/foods/${food.idMeal}` }>
              <div
                data-testid={ `${index}-recipe-card` }
                key={ index }
              >
                <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                />
              </div>
            </Link>))
        )
        : (foods.slice(0, FOOD_MAX_RESULT).map((food, index) => (
          <Link key={ index } to={ `/foods/${food.idMeal}` }>
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <p data-testid={ `${index}-card-name` }>{ food.strMeal }</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ food.strMealThumb }
                alt={ food.strMeal }
              />
            </div>
          </Link>))
        )}
    </div>
  );
}

NationalityCard.propTypes = {
  foods: PropTypes.shape({
    slice: PropTypes.func,
  }).isRequired,
};
