import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DrinksDetails from './Pages/Details/DrinksDetails';
import FoodDetails from './Pages/Details/FoodDetails';
import DoneRecipes from './Pages/DoneRecipes/DoneRecipes';
import Drinks from './Pages/Drinks/Drinks';
import InProgressDrinks from './Pages/Drinks/InProgress';
import ExploreDrinks from './Pages/Explore/Drinks/ExploreDrinks';
import ExDrinksIngredients from './Pages/Explore/Drinks/Ingredients/ExDrinksIngredients';
import Explore from './Pages/Explore/Explore';
import ExploreFoods from './Pages/Explore/Foods/ExploreFoods';
import ExFoodsIngredients from './Pages/Explore/Foods/Ingredients/ExFoodsIngredients';
import ExFooNationalities from './Pages/Explore/Foods/Nationalities/ExFoodsNationalities';
import FavoriteRecipes from './Pages/FavoriteRecipes/FavoriteRecipes';
import Foods from './Pages/Foods/Foods';
import InProgressFoods from './Pages/Foods/InProgress';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Provider from './Provider/Provider';

function App() {
  return (
    <Switch>
      <Provider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ FoodDetails } />
        <Route exact path="/foods/:id/in-progress" component={ InProgressFoods } />

        <Route exact path="/drinks/:id" component={ DrinksDetails } />
        <Route exact path="/drinks/:id/in-progress" component={ InProgressDrinks } />

        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ ExFoodsIngredients } />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExDrinksIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExFooNationalities }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Provider>
    </Switch>
  );
}

export default App;
