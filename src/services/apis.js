const RANDOM_FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const RANDOM_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

function randomFoodsApi() {
  try {
    const apiFetch = fetch(RANDOM_FOOD_URL);
    const json = apiFetch.then((response) => response.json());
    return json;
  } catch (e) {
    console.error(e);
  }
}

export function randomDrinksApi() {
  try {
    const apiFetch = fetch(RANDOM_DRINK_URL);
    const json = apiFetch.then((response) => response.json());
    return json;
  } catch (e) {
    console.error(e);
  }
}

export default randomFoodsApi;
